import React, { useEffect, useRef } from "react";
import { Box, Typography, Card, CardMedia, CardContent, styled } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import First from "../assets/why-1.jpg"; // Ensure the correct path to your image
import Second from "../assets/why-2.jpg"; // Ensure the correct path to your image
import Third from "../assets/why-3.jpg"; 

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Styled component for the About Section
const AboutSection = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(200px)', // Start 200px down
}));

export default function Why() {
  const sectionRef = useRef(null);

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
      title: "Durability",
      content: "Husqvarna products are built to last, designed to withstand the toughest conditions.",
    },
    {
      image: Second,
      title: "Performance",
      content: "Experience exceptional performance with our advanced engineering and technology.",
    },
    {
      image: Third,
      title: "Innovation",
      content: "We are committed to continuous innovation, providing cutting-edge solutions for our customers.",
    },
  ];

  return (
    <AboutSection ref={sectionRef} sx={{ padding: "40px", backgroundColor: "white", marginTop: '5vh', height: {md:'70vh',xs:'200vh'} }}>
      <Typography variant="h2" sx={{ color: "darkblue", marginBottom: "20px", marginLeft: '5vw' }}>
        Why Husqvarna?
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", marginTop: '5vh' }}>
        {cardData.map((card, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ width: 350,marginTop:{xs:'5vh',md:'0'}, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
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
              <Box sx={{ width: {md:'3px'}, backgroundColor: 'yellow', height: '100%', mx: 2, marginLeft:'5vw' }} />
            )}
          </Box>
        ))}
      </Box>
    </AboutSection>
  );
}
