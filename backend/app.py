from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load the trained model, scaler, and label encoders
with open("model.pkl", "rb") as f:
    model, scaler, label_encoders = pickle.load(f)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get input data from frontend
        
        # Extract features in the correct order
        features = [
            data['Age'], data['Weight'], data['Height'], data['BMI'],
            label_encoders['Blood Group'].transform([data['Blood Group']])[0],
            data['Pulse Rate'], data['Respiratory Rate'], data['Hemoglobin'],
            label_encoders['Cycle(R/I)'].transform([data['Cycle Type']])[0],
            data['Cycle Length'], data['Marriage Years'],
            label_encoders['Pregnant(Y/N)'].transform([data['Pregnant']])[0],
            data['Abortions'], data['Hip'], data['Waist'],
            label_encoders['Weight gain(Y/N)'].transform([data['Weight Gain']])[0],
            label_encoders['hair growth(Y/N)'].transform([data['Hair Growth']])[0],
            label_encoders['Skin darkening (Y/N)'].transform([data['Skin Darkening']])[0],
            label_encoders['Hair loss(Y/N)'].transform([data['Hair Loss']])[0],
            label_encoders['Pimples(Y/N)'].transform([data['Pimples']])[0],
            label_encoders['Fast food (Y/N)'].transform([data['Fast Food']])[0],
            label_encoders['Reg.Exercise(Y/N)'].transform([data['Exercise']])[0]
        ]

        # Convert to DataFrame with correct column names
        feature_names = ['Age (yrs)', 'Weight (Kg)', 'Height(Cm)', 'BMI', 'Blood Group',
                         'Pulse rate(bpm)', 'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)',
                         'Cycle length(days)', 'Marraige Status (Yrs)', 'Pregnant(Y/N)',
                         'No. of abortions', 'Hip(inch)', 'Waist(inch)', 'Weight gain(Y/N)',
                         'hair growth(Y/N)', 'Skin darkening (Y/N)', 'Hair loss(Y/N)',
                         'Pimples(Y/N)', 'Fast food (Y/N)', 'Reg.Exercise(Y/N)']
        
        df_features = pd.DataFrame([features], columns=feature_names)

        print("Raw Features Before Scaling:", df_features.values)

        # Scale the input data
        features_scaled = scaler.transform(df_features)

        # Debugging: Print Transformed Input
        print("Transformed Input Features:", features_scaled)

        # Make prediction
        prediction = model.predict(features_scaled)[0]
        result = "Yes" if prediction == 1 else "No"
        
        return jsonify({"PCOS Prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
