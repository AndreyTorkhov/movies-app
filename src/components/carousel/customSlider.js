import React, { useState } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./carouselItem.js";
import styles from "./styles.js";
import data from "../carousel/data.js";

const { width } = Dimensions.get("window");
export default function CustomSlider({ data }) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
    onSnapToItem: (index) => setActiveDotIndex(index),
  };
  const handleSnapToItem = (index) => {
    setActiveDotIndex(index); // Обновление активного индекса при смене слайда
  };
  return (
    <View style={styles.container}>
      <Carousel {...settings} onSnapToItem={handleSnapToItem} />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeDotIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
