# GrowGuide Backend

Self-contained Express + TypeScript + MongoDB backend for the GrowGuide hybrid AI-powered career intelligence platform.

## Features

- REST API for career analysis at `POST /api/analyze`
- Python-trained local TF-IDF model loaded by the Express API
- Local NLP/ML pipeline with tokenization, normalization, cosine similarity, and weighted skill scoring
- Skill gap analysis, role prediction, roadmap generation, planner generation, and recommendations
- MongoDB-backed analysis history
- Existing AI tools directory endpoints retained

## Quick Start

1. Copy `.env.example` to `.env`
2. Add Kaggle/job CSV files to `ml/data/`
3. Install Python ML dependencies: `python3 -m pip install -r ml/requirements.txt`
4. Train the local model: `npm run train:model`
5. Install Node packages: `npm install`
6. Run development server: `npm run dev`
7. Check types: `npm run check`

## Main Endpoints

- `GET /api/health`
- `POST /api/analyze`
- `GET /api/analyze/roles`
- `GET /api/analyze/history`
- `DELETE /api/analyze/history`
- `GET /api/ai-tools`

## Analyze Request

```json
{
  "role": "Target role from your dataset",
  "skills": ["Skill one", "Skill two"],
  "hoursPerDay": 2,
  "targetWeeks": 12
}
```

## Dataset

This backend does not include a dummy dataset. Add real Kaggle/job CSV files here:

```text
ml/data/
```

Then run:

```bash
npm run train:model
```

The Python trainer writes:

```text
ml/artifacts/career_model.json
```

`/api/analyze` loads this artifact. It will not fake results when the model has not been trained.

## Notes

GrowGuide does not depend on external AI APIs. The intelligence layer is trained locally from dataset CSVs and served from the project backend.
