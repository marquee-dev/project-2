import React from "react";
import HomeCarousel from "./HomeCarousel";
import Why from "./Why";
import Home_Models from "./Home_Models";
import Imager from "./Imager";
import Footer from "./Footer";
import Imager_2 from "./Imager_2";

export default function Home()
{
    return(
        <div>
            <HomeCarousel/>
            <Why/>
            <Imager/>
            <Home_Models/>
            <Imager_2/>
            <Footer/>
        </div>
    )
}