import React, { useState } from "react";
import Logo from "../assets/logo.png"; // Import your logo image
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import { TextField, Button, Typography, Box, Drawer, AppBar, Toolbar, IconButton } from "@mui/material";
import Imager from "./Imager";
import Imager_2 from "./Imager_2";
import Footer from "./Footer";
import Imager_3 from "./Imager_4";
import { useNavigate } from "react-router-dom";

export default function Dealers() {
    const navigate=useNavigate()

    const [drawerOpen, setDrawerOpen] = useState(false); // State for managing drawer open/close

    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [dealers, setDealers] = useState([]);
    const [message, setMessage] = useState("");
    const handleClick =(text) =>{
        if(text=="Models")
        {
            navigate("/models")
        }
        else if(text=="Dealers")
        {
            navigate("/dealers")
        }
        else if(text=="Home")
            {
                navigate("/")
            }
      }
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        // Create the search parameters object
        const searchParams = {
            city,
            district,
            state,
        };

        // Fetch dealer data from your backend
        try {
            const response = await fetch("http://localhost:4000/api/dealers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchParams),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setDealers(data);
                    setMessage(""); // Clear the message if dealers are found
                } else {
                    setDealers([]);
                    setMessage("There are no dealers at the selected area.");
                }
            } else {
                setMessage("Error fetching dealer data. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "100vw", margin: "auto" }}>
            <AppBar position="absolute" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <Toolbar>
                    <img src={Logo} alt="Husqvarna Logo" style={{ height: '40px', marginRight: 'auto' }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {['Home', 'Models','Dealers'].map((text) => (
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
                                onClick={()=>{handleClick(text)}}
                            >
                                {text}
                            </Button>
                        ))}
                    </Box>
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
                    {['Home', 'Models','Dealers'].map((text) => (
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
                            onClick={()=>{handleClick(text)}}
                        >
                            {text}
                        </Button>
                    ))}
                </Box>
            </Drawer>

            <Imager_3/>

            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ padding: '2rem' }} 
            >
                <Typography variant="h4" sx={{ marginBottom: "2rem", color: "darkblue" }}>
                    Find Dealers
                </Typography>
                <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '400px' }}>
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="District"
                        variant="outlined"
                        fullWidth
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="State"
                        variant="outlined"
                        fullWidth
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        sx={{ marginBottom: "2rem" }}
                    />
                    <Button variant="contained" type="submit" sx={{ backgroundColor: "darkblue", color: "white" }}>
                        Search
                    </Button>
                </form>

                {message && (
                    <Typography variant="h6" sx={{ color: "darkblue", marginTop: "2rem" }}>
                        {message}
                    </Typography>
                )}

                {dealers.length > 0 && (
                    <div style={{ marginTop: "2rem" }}>
                        <Typography variant="h6" sx={{ color: "darkblue" }}>
                            Dealers Found:
                        </Typography>
                        <ul>
                            {dealers.map((dealer) => (
                                <li key={dealer.id} style={{ color: "darkblue" }}>
                                    {dealer.name} - {dealer.address}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Box>
            <Imager_2/>
            <Footer/>
        </div>
    );
}
