import React, { useEffect, useRef } from "react";
import { Box, Typography, styled } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image_O from "../assets/svartpilen_im.jpeg"; // Replace with the correct path to your image

// Styled component for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative', // Allows text overlay
  width: '100%', // Full width
  height: 'auto', // Maintain aspect ratio
  overflow: 'hidden', // Ensure nothing overflows
}));

// Styled component for the image
const Image = styled('img')({
  width: '100%', // Full width
  height: 'auto', // Maintain aspect ratio
  display: 'block', // Remove extra space below the image
});

// Styled component for the overlay text
const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%', // Center vertically
  left: '20px', // Position to the left with some padding
  transform: 'translateY(-50%)', // Center vertically in relation to its own height
  color: 'white', // Text color
  textAlign: 'left', // Align text to the left
  fontSize: '2rem', // Adjust font size as needed
  opacity: 0, // Start with hidden text
  transition: 'opacity 0.5s ease-in-out', // Smooth transition for opacity
  [theme.breakpoints.down('sm')]: { // Responsive styling
    fontSize: '1.5rem', // Smaller font size on mobile
  },
}));

export default function Imager_3() {
  const imageContainerRef = useRef(null); // Create a reference for the image container
  const overlayTextRef = useRef(null); // Create a reference for the overlay text

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animation for the entire image container
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, scale: 0.9 }, // Start state
      {
        opacity: 1, // End state
        scale: 1, // End scale
        duration: 0.5,
        scrollTrigger: {
          trigger: imageContainerRef.current, // Trigger when this element comes into view
          start: "top 80%", // Start the animation when the top of the element hits 80% of the viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: true, // Animation should happen only once
        },
      }
    );

    // GSAP animation for the overlay text
    gsap.fromTo(
      overlayTextRef.current,
      { opacity: 0, y: 20 }, // Start state for text
      {
        opacity: 1, // End state for text
        y: 0, // End position for text
        duration: 0.5,
        scrollTrigger: {
          trigger: imageContainerRef.current, // Trigger when the image container comes into view
          start: "top 80%", // Start the animation when the top of the element hits 80% of the viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: true, // Animation should happen only once
        },
      }
    );

    // Cleanup the ScrollTrigger instance on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ImageContainer ref={imageContainerRef}>
      <Image src={Image_O} alt="Your Image Description" />
      <OverlayText 
        ref={overlayTextRef} // Attach the ref here
        variant="h4"
        fontFamily={"'Play', serif"}
        fontWeight={700}
      >
        ESCAPE THE EXTRAORDINARY
      </OverlayText>
    </ImageContainer>
  );
}
