# GrowGuide ML Training

This folder contains the local training pipeline for GrowGuide. It does not use external AI APIs.

## Input

Put your Kaggle/job dataset CSV files in:

```text
backend/ml/data/
```

The trainer can infer common columns such as:

- `role`, `job_title`, `title`, `position`, `designation`
- `description`, `job_description`, `responsibilities`, `summary`
- `skills`, `required_skills`, `requirements`, `qualifications`

## Train

From the project root:

```bash
npm run train:model
```

Or from `backend/`:

```bash
python3 ml/train_model.py --input ml/data --output ml/artifacts/career_model.json
```

## Output

The backend loads:

```text
backend/ml/artifacts/career_model.json
```

`/api/analyze` will not run until this artifact exists.
