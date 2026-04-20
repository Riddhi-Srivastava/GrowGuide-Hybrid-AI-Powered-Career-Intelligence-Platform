#!/usr/bin/env python3
"""Train GrowGuide's local career intelligence model from Kaggle/job CSV data.

The output is a JSON artifact loaded by the Express backend. This script uses
local TF-IDF vectors and extracted role-skill profiles; it does not call any
external AI API.
"""

from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS, TfidfVectorizer
from sklearn.preprocessing import normalize


ROLE_COLUMNS = [
    "role",
    "job_role",
    "job_title",
    "title",
    "position",
    "designation",
    "career",
    "occupation",
]

DESCRIPTION_COLUMNS = [
    "description",
    "job_description",
    "responsibilities",
    "summary",
    "overview",
    "details",
    "about",
]

SKILL_COLUMNS = [
    "skills",
    "job_skill_set",
    "required_skills",
    "requirements",
    "qualifications",
    "key_skills",
    "competencies",
]


def normalize_column(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", name.strip().lower()).strip("_")


def normalize_text(value: object) -> str:
    text = "" if pd.isna(value) else str(value)
    text = text.lower()
    text = re.sub(r"[^a-z0-9+#.\s/-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def title_case_role(value: str) -> str:
    value = re.sub(r"\s+", " ", str(value).strip())
    return value[:1].upper() + value[1:] if value.isupper() else value.title()


def split_skills(value: object) -> list[str]:
    if pd.isna(value):
        return []
    text = str(value)
    text = re.sub(r"[\[\]{}()\"']", " ", text)
    parts = re.split(r"[,;|/\n\r\t]+", text)
    skills: list[str] = []
    for part in parts:
        skill = re.sub(r"\s+", " ", part).strip(" -:").strip()
        if 2 <= len(skill) <= 60:
            skills.append(skill)
    return skills


def find_columns(df: pd.DataFrame, candidates: list[str]) -> list[str]:
    normalized = {normalize_column(column): column for column in df.columns}
    found = []
    for candidate in candidates:
        key = normalize_column(candidate)
        if key in normalized:
            found.append(normalized[key])
    return found


def read_csv(path: Path) -> pd.DataFrame:
    for encoding in ("utf-8", "utf-8-sig", "latin1"):
        try:
            return pd.read_csv(path, encoding=encoding, low_memory=False)
        except UnicodeDecodeError:
            continue
    return pd.read_csv(path, low_memory=False)


def collect_csv_paths(input_path: Path) -> list[Path]:
    if input_path.is_file():
        return [input_path]
    return sorted(input_path.glob("*.csv"))


def load_rows(input_path: Path) -> pd.DataFrame:
    csv_paths = collect_csv_paths(input_path)
    if not csv_paths:
        raise SystemExit(f"No CSV files found at {input_path}")

    frames = []
    for path in csv_paths:
        frame = read_csv(path)
        frame.columns = [normalize_column(column) for column in frame.columns]
        frame["_source_file"] = path.name
        frames.append(frame)

    return pd.concat(frames, ignore_index=True)


def choose_role_column(df: pd.DataFrame) -> str:
    columns = find_columns(df, ROLE_COLUMNS)
    if not columns:
        raise SystemExit(
            "Could not find a role/title column. Rename one column to job_title, role, title, position, or designation."
        )
    return normalize_column(columns[0])


def role_documents(df: pd.DataFrame, max_rows_per_role: int) -> tuple[list[dict], int]:
    role_col = choose_role_column(df)
    description_cols = [normalize_column(col) for col in find_columns(df, DESCRIPTION_COLUMNS)]
    skill_cols = [normalize_column(col) for col in find_columns(df, SKILL_COLUMNS)]

    if not description_cols and not skill_cols:
        raise SystemExit(
            "Could not find description or skills columns. Add job_description/description or skills/requirements columns."
        )

    grouped: dict[str, list[dict]] = defaultdict(list)
    for _, row in df.iterrows():
        raw_role = row.get(role_col)
        if pd.isna(raw_role) or not str(raw_role).strip():
            continue

        role_name = title_case_role(str(raw_role))
        descriptions = [normalize_text(row.get(column, "")) for column in description_cols]
        skills = []
        for column in skill_cols:
            skills.extend(split_skills(row.get(column, "")))

        text = " ".join([role_name, *descriptions, " ".join(skills)]).strip()
        if text:
            grouped[role_name].append({"text": text, "skills": skills})

    profiles = []
    for role_name, items in grouped.items():
        selected = items[:max_rows_per_role]
        text = " ".join(item["text"] for item in selected)
        skill_counter = Counter(
            normalize_text(skill)
            for item in selected
            for skill in item["skills"]
            if normalize_text(skill)
        )
        profiles.append(
            {
                "roleName": role_name,
                "document": text,
                "skillCounter": skill_counter,
                "examples": len(items),
            }
        )

    if not profiles:
        raise SystemExit("No usable role rows were found in the dataset.")

    return profiles, len(df)


def infer_category(skill: str) -> str:
    skill_l = skill.lower()
    if any(term in skill_l for term in ["python", "java", "javascript", "sql", "c++", "typescript"]):
        return "Technical"
    if any(term in skill_l for term in ["leadership", "communication", "management", "planning"]):
        return "Professional"
    if any(term in skill_l for term in ["analysis", "analytics", "statistics", "research"]):
        return "Analytical"
    return "Role Skill"


def build_required_skills(
    profile: dict,
    feature_names: np.ndarray,
    vector,
    top_skill_count: int,
) -> list[dict]:
    skills: list[dict] = []
    seen = set()

    for skill, count in profile["skillCounter"].most_common(top_skill_count):
        clean = skill.strip()
        if clean and clean not in seen:
            seen.add(clean)
            skills.append(
                {
                    "name": clean.title(),
                    "weight": max(5, min(10, 5 + int(math.log(count + 1, 2)))),
                    "category": infer_category(clean),
                }
            )

    if len(skills) < top_skill_count:
        row = vector.toarray().ravel()
        top_indices = row.argsort()[::-1]
        for index in top_indices:
            term = str(feature_names[index]).strip()
            if not term or term in ENGLISH_STOP_WORDS or len(term) < 3:
                continue
            if term in seen:
                continue
            seen.add(term)
            score = row[index]
            skills.append(
                {
                    "name": term.title(),
                    "weight": max(3, min(10, int(round(score * 20)) + 4)),
                    "category": infer_category(term),
                }
            )
            if len(skills) >= top_skill_count:
                break

    return skills


def sparse_vector(row, max_terms: int) -> list[list[float]]:
    dense = row.toarray().ravel()
    nonzero = np.flatnonzero(dense)
    ordered = sorted(nonzero, key=lambda index: dense[index], reverse=True)[:max_terms]
    return [[int(index), round(float(dense[index]), 8)] for index in ordered]


def train(input_path: Path, output_path: Path, max_features: int, max_rows_per_role: int, top_skill_count: int) -> None:
    df = load_rows(input_path)
    profiles, source_rows = role_documents(df, max_rows_per_role)
    documents = [profile["document"] for profile in profiles]

    vectorizer = TfidfVectorizer(
        stop_words="english",
        lowercase=True,
        ngram_range=(1, 2),
        min_df=1,
        max_features=max_features,
        token_pattern=r"(?u)\b[a-zA-Z][a-zA-Z0-9+.#-]{1,}\b",
    )
    matrix = normalize(vectorizer.fit_transform(documents), norm="l2", axis=1)
    feature_names = vectorizer.get_feature_names_out()

    roles = []
    for index, profile in enumerate(profiles):
        vector = matrix[index]
        role_name = profile["roleName"]
        role_tokens = [token for token in normalize_text(role_name).split() if token not in ENGLISH_STOP_WORDS]
        roles.append(
            {
                "roleName": role_name,
                "keywords": sorted(set([normalize_text(role_name), *role_tokens])),
                "examples": profile["examples"],
                "requiredSkills": build_required_skills(profile, feature_names, vector, top_skill_count),
                "vector": sparse_vector(vector, max_terms=500),
            }
        )

    artifact = {
        "version": 1,
        "trainedAt": datetime.now(timezone.utc).isoformat(),
        "sourceRows": int(source_rows),
        "roleCount": len(roles),
        "maxFeatures": max_features,
        "vocabulary": feature_names.tolist(),
        "idf": [round(float(value), 8) for value in vectorizer.idf_.tolist()],
        "roles": roles,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(artifact, indent=2), encoding="utf-8")
    print(f"Trained GrowGuide model with {len(roles)} roles from {source_rows} rows.")
    print(f"Saved artifact: {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="ml/data", help="CSV file or folder containing Kaggle CSV files.")
    parser.add_argument("--output", default="ml/artifacts/career_model.json", help="Output model artifact path.")
    parser.add_argument("--max-features", type=int, default=8000)
    parser.add_argument("--max-rows-per-role", type=int, default=250)
    parser.add_argument("--top-skill-count", type=int, default=16)
    args = parser.parse_args()

    train(
        input_path=Path(args.input),
        output_path=Path(args.output),
        max_features=args.max_features,
        max_rows_per_role=args.max_rows_per_role,
        top_skill_count=args.top_skill_count,
    )


if __name__ == "__main__":
    main()
