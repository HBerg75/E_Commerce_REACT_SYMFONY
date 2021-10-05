import React from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import img_menu_1 from "../img/playstation_logo.jpg"
import img_menu_2 from "../img/xbox_logo.png"
import img_menu_3 from "../img/switch_logo.png"
import img_menu_4 from "../img/windows_logo.png"



function Carousel_banner() {
    return (
        <div style={{maxWidth: "40%", margin: "auto"}}>
            <Carousel infiniteLoop useKeyboardArrows autoPlay interval="2000">
                <div>
                    <img className="carousel_menu" src={img_menu_1} alt="playstation_logo" />
                </div>
                <div>
                    <img className="carousel_menu" src={img_menu_2} alt="xbox_logo"/>
                </div>
                <div>
                    <img className="carousel_menu" src={img_menu_3} alt="switch_logo" />
                </div>
                <div>
                    <img className="carousel_menu" src={img_menu_4} alt="windows_logo" />
                </div>
            </Carousel>
        </div>
    )
}

export default Carousel_banner;