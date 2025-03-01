import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prediction = location.state?.prediction || "No result";

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                style={{
                    backgroundColor: "#f3e5f5",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    PCOS Prediction Result
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {prediction}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate("/")}
                    style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}
                >
                    Go Back to Home
                </Button>
            </Container>
        </ThemeProvider>
    );
};

export default Result;
