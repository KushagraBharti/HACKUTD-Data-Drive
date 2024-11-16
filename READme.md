# **DataDrive: Unified Insights for Data & Fuel Optimization**

DataDrive is a multi-domain platform that combines **data observability** and **fuel optimization** insights. It leverages AI/ML models to monitor data inefficiencies, predict fuel consumption, and calculate environmental impacts, providing actionable recommendations to users.

## **Tech Stack**

### Frontend
- **Framework**: [Vite](https://vitejs.dev/) (React + TypeScript)
- **Styling**: TailwindCSS, ShadCN
- **Charts**: Chart.js for interactive visualizations

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite (local) / PostgreSQL (for deployment)
- **ML Models**: Scikit-learn and TensorFlow for AI/ML
- **Integration**: Pinata for tamper-proof logs and reports

### Frontend Setup (YARN as package manager)

To set up and run the frontend:

1. Install dependencies:
   ```bash
   cd frontend
   yarn install

   # to add new dependencies
   yarn add {}
   ```

# Vite (React + Typescript) for Frontend

```

cd frontend
yarn vite dev

```

# Python & Flask API for backend

```

cd backend
python3 -m venv venv

# macos
source venv/bin/activate

# windows
.\venv\Scripts\activate

pip install -r requirements.txt

python app.py

```