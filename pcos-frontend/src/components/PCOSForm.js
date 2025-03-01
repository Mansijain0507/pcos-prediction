import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, MenuItem, Button, Typography, Grid, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#9b59b6", // Light Violet Shade
        },
        background: {
            default: "#f3e5f5", // Light lavender background
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});

const PCOSForm = () => {
    const [formData, setFormData] = useState({
        Age: "", Weight: "", Height: "", BMI: "", "Blood Group": "A+", "Pulse Rate": "",
        "Respiratory Rate": "", Hemoglobin: "", "Cycle Type": "R", "Cycle Length": "",
        "Marriage Years": "", Pregnant: "No", Abortions: "", Hip: "", Waist: "",
        "Weight Gain": "No", "Hair Growth": "No", "Skin Darkening": "No",
        "Hair Loss": "No", Pimples: "No", "Fast Food": "No", "Exercise": "No",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("https://pcos-prediction-gvcc.onrender.com/predict", formData, {
                headers: { "Content-Type": "application/json" },
            });
            navigate("/result", { state: { prediction: response.data["PCOS Prediction"] } });
        } catch (error) {
            setError("Error submitting form. Please try again.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" style={{ backgroundColor: "#f3e5f5", padding: "20px", borderRadius: "10px" }}>
                <Typography variant="h4" align="center" gutterBottom color="primary">
                    PCOS Prediction Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} sm={6} key={key}>
                                {key.includes("(Y/N)") || key === "Pregnant" || key === "Blood Group" || key === "Cycle Type" ? (
                                    <TextField
                                        select
                                        fullWidth
                                        label={key.replace(/_/g, " ")}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                    >
                                        {key === "Blood Group"
                                            ? ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))
                                            : key === "Cycle Type"
                                                ? ["R", "I"].map((option) => (
                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                ))
                                                : ["Yes", "No"].map((option) => (
                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                ))}
                                    </TextField>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={key.replace(/_/g, " ")}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        style={{ marginTop: "20px" }}
                    >
                        {loading ? "Predicting..." : "Submit"}
                    </Button>
                </form>
                {error && <Typography color="error" align="center">{error}</Typography>}
            </Container>
        </ThemeProvider>
    );
};

export default PCOSForm;
