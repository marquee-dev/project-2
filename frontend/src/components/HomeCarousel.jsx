import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { AppBar, Box, Toolbar, Button, Typography, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import First from "../assets/fourth.jpeg"; // Ensure the correct path to your image
import Second from "../assets/third.jpg"; // Ensure the correct path to your image
import Third from "../assets/second.jpg"; // Ensure the correct path to your image
import Fourth from "../assets/first.jpg"; // Ensure the correct path to your image
import Logo from "../assets/logo.png"; // Import your logo image
import { useNavigate } from "react-router-dom";

const HomeCarousel = () => {
    const navigate=useNavigate()
  const [activeSlide, setActiveSlide] = useState(0); // State for tracking active slide
  const [drawerOpen, setDrawerOpen] = useState(false); // State for managing drawer open/close
  const sliderRef = useRef(null); // Create a reference for the Slider component

  const carouselItems = [
    {
      image: First,
      text: "ELEGANCE",
    },
    {
      image: Second,
      text: "BOLDNESS",
    },
    {
      image: Third,
      text: "EXCELLENCE",
    },
    {
      image: Fourth,
      text: "RESILIENCE",
    },
  ];

  // Slick slider settings for fade animation
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slide transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    beforeChange: (current, next) => setActiveSlide(next), // Update active slide
  };

  // Function to toggle the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const handleClick =(text) =>{
    if(text=="Models")
    {
        navigate("/models")
    }
    else if(text=="Dealers")
    {
        navigate("/dealers")
    }
  }
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Transparent Navbar */}
      <AppBar position="absolute" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <img src={Logo} alt="Husqvarna Logo" style={{ height: '40px', marginRight: 'auto' }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {['Home', 'Models', 'Dealers', ].map((text) => (
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
              onClick={()=>{handleClick(text)}}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Drawer>

      {/* Carousel with Fade Animation */}
      <Slider ref={sliderRef} {...settings}>
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "100vw",
              height: "100vh",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center", // Center the text vertically
              justifyContent: "center", // Center the text horizontally
            }}
          >
            {/* Text Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 50,
                left: 50,
                color: "white",
                backgroundColor: "rgba(0, 0, 139, 0.322)",
                padding: "10px 20px",
                borderRadius: "8px",
                textAlign: "center",
                width: { xs: '80%', md: 'auto' }, // Adjust width for mobile
              }}
            >
              <Typography variant="h3" component="div" sx={{ fontWeight: "bold", fontFamily: "'Gruppo', serif", fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {item.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Custom Navigation Circles */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {carouselItems.map((_, index) => (
          <Box
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index)} // Navigate to the corresponding slide
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: activeSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              transition: "background-color 0.3s ease",
              cursor: "pointer", // Add pointer to indicate clickable
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HomeCarousel;
