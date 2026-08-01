# Pipeline Builder

A configurable workflow editor built with **React Flow** and **FastAPI**, featuring reusable node abstractions, dynamic variable handles, and backend DAG validation.

---

## ✨ Features

- Configuration-driven node architecture
- 9 reusable pipeline node types
- Shared BaseNode component
- Dynamic variable parsing (`{{variable}}`)
- Automatic handle generation
- Drag-and-drop workflow editor
- FastAPI backend integration
- Directed Acyclic Graph (DAG) validation
- Modern minimal UI

---

## 🏗 Architecture

```
Toolbar
    ↓
Node Registry
    ↓
Node Factory
    ↓
Base Node
    ↓
React Flow Canvas
    ↓
Submit Pipeline
    ↓
FastAPI Backend
    ↓
DAG Validation
```

---

## 🛠 Tech Stack

- React
- React Flow
- JavaScript
- FastAPI
- Python
- NetworkX

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── nodes/
│   ├── App.js
│   ├── submit.js
│   └── ui.js

backend/
└── main.py
```

---

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install fastapi uvicorn networkx
uvicorn main:app --reload
```

---

## 💡 Key Engineering Decisions

- Built a reusable **BaseNode** component to eliminate duplicated node code.
- Used a **configuration-driven node registry** so new node types can be added with minimal code.
- Implemented **dynamic variable parsing** to automatically generate input handles from `{{variable}}` syntax.
- Integrated a **FastAPI backend** to validate pipelines as Directed Acyclic Graphs (DAGs).
