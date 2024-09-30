import React, { useState } from "react";
import { AppBar, Toolbar, Button, TextField, Typography, Box, IconButton, Drawer } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import Logo from "../assets/logo.png"; // Import your logo image
import Imager from "./Imager";
import Imager_2 from "./Imager_2";
import Footer from "./Footer";
import Imager_3 from "./Imager_4";

export default function Booking() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false); // State for managing drawer open/close
    const { bikeType } = useParams(); // Get the bike type from the URL
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    const handleClick = (text) => {
        if (text === "Models") {
            navigate("/models");
        } else if (text === "Dealers") {
            navigate("/dealers");
        } else if (text === "Home") {
            navigate("/");
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create the data object to send to the backend
        const bookingData = {
            bikeType,
            name,
            mobile,
            location,
        };

        // Submit the data to the backend
        try {
            const response = await fetch("http://localhost:4000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                // Handle success by setting the success message
                setSuccessMessage("Our Dealers Will Get To You Soon. Thank You.");
                // Optionally, reset form fields
                setName("");
                setMobile("");
                setLocation("");
            } else {
                // Handle error
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <AppBar position="absolute" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <Toolbar>
                    <img src={Logo} alt="Husqvarna Logo" style={{ height: '40px', marginRight: 'auto' }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {['Home', 'Models', 'Dealers'].map((text) => (
                            <Button
                                key={text}
                                color="inherit"
                                sx={{
                                    color: "white",
                                    fontFamily: "'Gruppo', serif",
                                    '&:hover': {
                                        color: "darkblue", // Change color on hover
                                    }
                                }}
                                onClick={() => { handleClick(text) }}
                            >
                                {text}
                            </Button>
                        ))}
                    </Box>

                    {/* Hamburger Menu Icon for Mobile */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }} // Show only on mobile
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile Menu */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h6" sx={{ padding: 2 }}>Menu</Typography>
                    {['Home', 'Models', 'Dealers'].map((text) => (
                        <Button
                            key={text}
                            color="inherit"
                            fullWidth
                            sx={{
                                color: "black",
                                fontFamily: "'Gruppo', serif",
                                '&:hover': {
                                    color: "darkblue", // Change color on hover
                                }
                            }}
                            onClick={() => { handleClick(text) }}
                        >
                            {text}
                        </Button>
                    ))}
                </Box>
            </Drawer>

            <Imager_3 />

            {/* Booking Form */}
            <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto", marginTop: "100px" }}>
                <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
                    Booking for {bikeType} Motorcycle
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ marginBottom: "2rem" }}
                    />
                    <Button variant="contained" type="submit" sx={{ backgroundColor: "darkblue", color: "white" }}>
                        Submit
                    </Button>
                </form>

                {/* Display success message */}
                {successMessage && (
                    <Typography variant="h6" sx={{ marginTop: "2rem", color: "green", textAlign: "center" }}>
                        {successMessage}
                    </Typography>
                )}
            </div>

            <Imager_2 />
            <Footer />
        </div>
    );
}
