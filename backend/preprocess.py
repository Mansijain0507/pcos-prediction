import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Load dataset
df = pd.read_excel("dataset/pcos_dataset.xlsx")

# Encode categorical variables
label_encoders = {}
for col in ['Blood Group', 'Cycle(R/I)', 'Pregnant(Y/N)', 'Weight gain(Y/N)', 'hair growth(Y/N)',
            'Skin darkening (Y/N)', 'Hair loss(Y/N)', 'Pimples(Y/N)', 'Fast food (Y/N)', 'Reg.Exercise(Y/N)', 'PCOS (Y/N)']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  # Save encoders

# Split data into features and target
X = df.drop(columns=['PCOS (Y/N)'])  # Features
y = df['PCOS (Y/N)']  # Target

# Scale numerical features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save the label encoders and scaler
with open("preprocess.pkl", "wb") as f:
    pickle.dump((scaler, label_encoders), f)

print("Preprocessing completed. Encoders and Scaler saved!")
