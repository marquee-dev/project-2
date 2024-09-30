import React, { useEffect, useRef } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, styled } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bike1 from "../assets/svartpilen.png"; // Replace with the correct path to your image
import Bike2 from "../assets/vitpilen.png"; // Replace with the correct path to your image
import { useNavigate } from "react-router-dom";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Styled component for the Models Section
const ModelsSection = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(200px)', // Start 200px down
}));

export default function Home_Models() {
    const navigate=useNavigate()
  const sectionRef = useRef(null);
  const handleModel= (name) =>{
    if(name=="Husqvarna Vitpilen 401")
    {
        navigate("/models/vitpilen")
    }
    else
    {
        navigate("models/svartpilen")
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

  const bikeData = [
    {
      image: Bike1,
      name: "Husqvarna Vitpilen 401",
    },
    {
      image: Bike2,
      name: "Husqvarna Svartpilen 401",
    },
  ];

  return (
    <ModelsSection ref={sectionRef} sx={{ padding: "40px", backgroundColor: "white", textAlign: "center", marginTop: '5vh' }}>
      <Typography variant="h2" sx={{ color: "darkblue", marginBottom: "20px" }}>
        Our Models
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
        {bikeData.map((bike, index) => (
          <Card 
            key={index} 
            sx={{ 
              width: 310, 
              boxShadow: 'none', // Remove box shadow
              transition: "transform 0.3s", 
              "&:hover": { transform: "scale(1.05)" } 
            }}
          >
            <CardMedia component="img" height="200" image={bike.image} alt={bike.name} sx={{ objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h5" sx={{ color: "darkblue" }}>
                {bike.name}
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: "darkblue", color: "white", marginTop: 2 }} onClick={()=>handleModel(bike.name)}>
                View Model
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </ModelsSection>
  );
}
