# SheCares - PCOS Prediction Web App

## Overview
SheCares is a web application designed to predict the likelihood of PCOS (Polycystic Ovary Syndrome) based on user-inputted health data. The app uses a machine learning model deployed with Flask as the backend and React with Material UI as the frontend.

## Features
- **PCOS Prediction Form:** Users enter their health data, and the model predicts the likelihood of PCOS.

## Tech Stack
### **Frontend**
- React.js
- Material UI
- Axios (for API requests)

### **Backend**
- Flask (Python)
- Scikit-learn (for machine learning model)
- Pandas & NumPy (for data processing)

### **Database & Storage**
- Dataset stored in `backend/dataset/`
- Model saved as `backend/model.pkl`

## Installation & Setup
### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/pcos-prediction.git
cd pcos-prediction
```

### **2. Backend Setup (Flask API)**
```bash
cd backend
pip install -r requirements.txt
python preprocess.py  # Preprocess dataset
python train_model.py  # Train and save model
python app.py  # Start backend server
```

### **3. Frontend Setup (React App)**
```bash
cd pcos-frontend
npm install
npm start
```

## Usage
1. Open `http://localhost:3000/`
2. Click **"Test Your PCOS Now"** on the home page.
3. Fill out the form and submit it.
4. View the PCOS prediction result.

## API Endpoints
- **`POST /predict`** - Sends form data and returns the PCOS prediction.

## Contributors
- **Mansi Jain** (Frontend & Backend Development, AI Integration)

## License
This project is licensed under the MIT License.

