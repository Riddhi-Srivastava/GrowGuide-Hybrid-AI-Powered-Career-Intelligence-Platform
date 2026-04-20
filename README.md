# GrowGuide – Hybrid AI-Powered Career Intelligence Platform

## Project Overview

GrowGuide is a fully self-contained AI-powered SaaS platform built using the MERN stack (MongoDB, Express.js, React, Node.js).

It provides intelligent career guidance, skill analysis, and personalized learning plans without relying on external APIs, ensuring:

* Privacy
* Reliability
* Offline Capability

The platform combines a modern multi-page website with an intelligent application system and a premium UI/UX experience.

**Live Demo:**
https://grow-guide-final-project.vercel.app

---

## Core Intelligence System

GrowGuide uses a custom Machine Learning + NLP engine trained on Kaggle datasets (job roles, skills, job descriptions).

### Key Features

* Skill Gap Analysis
* Role Prediction
* Match Score Calculation
* Missing Skills Detection
* Personalized Career Roadmap
* Smart Recommendations
* Time-Based Learning Planner

---

## Machine Learning Pipeline

### Dataset

* Source: Kaggle

### Preprocessing

* Tokenization
* Stopword Removal
* Text Normalization

### Feature Engineering

* TF-IDF Vectorization
* Keyword Mapping

### Algorithms Used

* Cosine Similarity
* Weighted Scoring System

---

## Offline NLP Engine

* natural.js for tokenization
* fuse.js for fuzzy search

---

## Backend Architecture

REST API Endpoint:

```
/api/analyze
```

---

## Additional Features

* Career Roadmap Visualization
* Time-Based Learning Planner
* Role Comparison System
* Analysis History Tracking
* Smart Insights from History
* Graph Visualization using ReactFlow
* PDF Export using jsPDF and html2canvas

---

## Tech Stack

### Frontend

* React.js (Vite)
* TypeScript
* Tailwind CSS
* React Router
* ReactFlow
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Machine Learning & NLP

* natural.js
* fuse.js
* TF-IDF Vectorization
* Cosine Similarity

### Tools & Libraries

* Axios
* jsPDF
* html2canvas
* dotenv

---

## Deployment

* Frontend: Vercel
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## Conclusion

GrowGuide is a complete hybrid AI system combining Machine Learning, NLP, and SaaS architecture.

It delivers intelligent, personalized career guidance with offline support, making it scalable, secure, and efficient.

---

## Future Scope

* Deep Learning Integration
* Resume Analyzer
* Real-time Job Market Insights
* AI Chat Career Assistant

---

## Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

Built for the future of intelligent career guidance.
