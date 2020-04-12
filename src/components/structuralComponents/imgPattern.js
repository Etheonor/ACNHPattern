import React, {useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImgPattern = props => {
  const [winSize, setWinSize] = useState(true)

  const resizeTest = () => {
    if (window.innerWidth < 500 && winSize === true) {
      setWinSize(false)
    }
    
  }
  window.addEventListener('resize', resizeTest);
  return (
    <div>
      <Carousel showThumbs={winSize}>
        
        {props.images.map((el, index) => {
          return (
            <div key={index} >
              <img src={el} alt=''/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImgPattern;
