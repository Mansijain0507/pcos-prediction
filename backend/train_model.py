import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the preprocessed data
df = pd.read_excel("dataset/pcos_dataset.xlsx")

# Load the preprocessing components (encoders & scaler)
with open("preprocess.pkl", "rb") as f:
    scaler, label_encoders = pickle.load(f)

# Encode categorical features
for col in label_encoders:
    df[col] = label_encoders[col].transform(df[col])

# Split data
X = df.drop(columns=['PCOS (Y/N)'])
y = df['PCOS (Y/N)']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the data
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Print feature importance
importances = model.feature_importances_
feature_names = X.columns

# Print the most important features
for name, importance in zip(feature_names, importances):
    print(f"{name}: {importance:.4f}")

# Save the trained model
with open("model.pkl", "wb") as f:
    pickle.dump((model, scaler, label_encoders), f)

print("Model training complete. Model saved as model.pkl!")
