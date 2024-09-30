import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Button, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import Logo from "../assets/logo.png"; // Import your logo image
import BikeImage from "../assets/vitpilen.png"; // Path to the bike image
import { Box, Typography, Card, CardMedia, CardContent, styled } from "@mui/material";
import Imager_4 from "./Imager_4";
import Imager_3 from "./Imager_3";
import First from "../assets/svartpilen_engine.jpg"; // Ensure the correct path to your image
import Second from "../assets/why-2.jpg"; // Ensure the correct path to your image
import Third from "../assets/svartpilen_wheel.jpg"; 

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const AboutSection = styled(Box)(({ theme }) => ({
    opacity: 0,
    transform: 'translateY(200px)', // Start 200px down
  }));
const Vitpilen = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false); // State for managing drawer open/close
  const imageRef = useRef(null); // Reference for the image section
  const textRef = useRef(null); // Reference for the text section
  const handleClick = () =>{
    navigate("/models/vitpilen/booking")
  }
  const handleNav =(text) =>{
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
  useEffect(() => {
    const section = sectionRef.current;

    // GSAP ScrollTrigger animation
    gsap.fromTo(
      section,
      { opacity: 0, y: 200 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Start the animation when the top of the section hits 80% of the viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: true, // Animation should happen only once
        },
      }
    );

    return () => {
      // Clean up the ScrollTrigger instance on component unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const cardData = [
    {
      image: First,
      title: "Engine And Gearbox",
      content: "Husqvarna products are built to last, designed to withstand the toughest conditions.",
    },
    {
      image: Second,
      title: "Frame",
      content: "Experience exceptional performance with our advanced engineering and technology.",
    },
    {
      image: Third,
      title: "Brakes",
      content: "We are committed to continuous innovation, providing cutting-edge solutions for our customers.",
    },
  ];

  // Function to toggle the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the image and text sections
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: 50 }, // Start state
      {
        opacity: 1, // End state
        y: 0, // End position
        duration: 0.5,
        scrollTrigger: {
          trigger: imageRef.current, // Trigger animation when this element comes into view
          start: "top 80%", // Start animation when the top of the element hits 80% of the viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: true, // Animation should happen only once
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 }, // Start state
      {
        opacity: 1, // End state
        y: 0, // End position
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current, // Trigger animation when this element comes into view
          start: "top 80%", // Start animation when the top of the element hits 80% of the viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: true, // Animation should happen only once
        },
      }
    );

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Transparent Navbar */}
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
                onClick={()=>{handleNav(text)}}
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
          {['Home', 'Models',  'Dealers'].map((text) => (
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
              onClick={()=>{handleNav(text)}}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Drawer>

      <Imager_3 />

      {/* Main Content Area */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '64px', mb: 10 }}>
        {/* 70% Image Section */}
        <Box ref={imageRef} sx={{ width: { xs: "50%", md: "70%" }, display: "flex", justifyContent: "center" }}>
          <img src={BikeImage} alt="Husqvarna Svartpilen" style={{ width: "100%", borderRadius: "8px" }} />
        </Box>

        {/* 30% Text Section */}
        <Box ref={textRef} sx={{ width: { xs: "50%", md: "30%" }, padding: 2 }}>
          <Typography variant="h3" sx={{ color: "darkblue", fontFamily: "'Gruppo', serif" }}>
            Husqvarna Vitpilen 401
          </Typography>
          <Typography variant="body1" sx={{ marginY: 2 }}>
            The Husqvarna Vitpilen 401 is a nimble and stylish motorcycle that combines modern design with powerful performance. 
            Its lightweight chassis and high-quality components ensure an exhilarating ride for urban commuting and weekend adventures.
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: "darkblue", color: "white" }} onClick={handleClick}>
            Book Now
          </Button>
        </Box>
      </Box>
      
      <Imager_4 />
      <AboutSection ref={sectionRef} sx={{ padding: "40px", backgroundColor: "white", marginTop: '5vh', height: {md:'70vh',xs:'200vh'} }}>
      <Typography variant="h2" sx={{ color: "darkblue", marginBottom: "20px", marginLeft: '5vw' }}>
        SPECS
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", marginTop: '5vh' }}>
        {cardData.map((card, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ width: 350,marginTop:{xs:'5vh',md:'0'}, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" }, boxShadow:"none" }}>
              <CardMedia component="img" height="250" image={card.image} alt={card.title} sx={{ objectFit: 'contain' }} />
              <CardContent>
                <Typography variant="h5" sx={{ color: "darkblue" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" , marginTop:'2vh'}}>
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
            {/* Add a separator line */}
            {index < cardData.length - 1 && (
              <Box sx={{ width: {md:'2px'}, backgroundColor: 'yellow', height: '100%', mx: 2, marginLeft:'5vw' }} />
            )}
          </Box>
        ))}
      </Box>
    </AboutSection>
    <Footer/>
    </div>
  );
};

export default Vitpilen;
