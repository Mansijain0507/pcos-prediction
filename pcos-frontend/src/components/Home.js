import React from "react";
import { useNavigate } from "react-router-dom";
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

const Home = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
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
                <Typography variant="h3" color="primary" gutterBottom>
                    Welcome to PCOS Prediction
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate("/predict")}
                    style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}
                >
                    Test Your PCOS Now
                </Button>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
