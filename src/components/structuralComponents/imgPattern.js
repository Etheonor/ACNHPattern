import React from "react";
import styles from "./imgPattern.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImgPattern = props => {
  return (
    <div className={styles.Carousel}>
      <Carousel>
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
