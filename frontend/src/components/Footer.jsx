import React from "react";
import { Box, Typography, Link } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from "react-router-dom";

// Footer Component
export default function Footer() {
    const navigate =useNavigate()
    const handleModels = () => {
        navigate("/models")
    }
    const handleDealers = () => {
        navigate("/dealers")
    }
  return (
    <Box sx={{ bgcolor: 'rgb(0, 0, 54)', color: 'white', py: 4 }}>
      {/* Footer Columns */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, height: '20vh' }}>
        {/* Discover Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 10, gap:'2vh' }}>
          <Typography variant="h6" gutterBottom>
            Discover
          </Typography>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none' }} onClick={handleModels}>Models</Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none' }} onClick={handleDealers}>Dealers</Link>
        </Box>

        {/* Legal Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:'2vh' }}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>Legal Notices</Link>
        </Box>

        {/* Follow Us Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 8 ,gap:'2vh'}}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '120px' }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}><InstagramIcon /></Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}><FacebookIcon /></Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}><YouTubeIcon /></Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}><TwitterIcon /></Link>
          </Box>
        </Box>
      </Box>

      {/* Rights Reserved Text */}
      <Typography variant="body2" align="center">
        This is a demo site. It does not have any connection with Husqvarna.
      </Typography>
    </Box>
  );
}
