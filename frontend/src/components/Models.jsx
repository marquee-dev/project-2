import React from "react";
import { motion } from "framer-motion";
import Bike1 from "../assets/svartpilen.png"; // Replace with the correct path to your image
import Bike2 from "../assets/vitpilen.png";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Models() {
  const navigate = useNavigate();

  const handleVitpilen = () => {
    console.log("Navigating to Vitpilen");
    navigate("/models/vitpilen");
  };

  const handleSvartpilen = () => {
    console.log("Navigating to Svartpilen");
    navigate("/models/svartpilen");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: "darkblue",
        }}
      >
        Our Exclusive Models
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "center",alignItems:{xs:'center'}, gap: "2rem" }}>
        {/* Model 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleVitpilen}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            style={{
              width: "300px",
              height: "400px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <motion.img
              src={Bike1} // Replace with your model image
              alt="Vitpilen"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ marginTop: "1rem", color: "darkblue" }}>
              Vitpilen
            </Typography>
          </motion.div>
        </motion.div>

        {/* Model 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSvartpilen}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            style={{
              width: "300px",
              height: "400px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <motion.img
              src={Bike2} // Replace with your model image
              alt="Svartpilen"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ marginTop: "1rem", color: "darkblue" }}>
              Svartpilen
            </Typography>
          </motion.div>
        </motion.div>
      </Box>
    </div>
  );
}
