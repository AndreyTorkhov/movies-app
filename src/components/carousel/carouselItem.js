import React from "react";
import { ParallaxImage } from "react-native-snap-carousel";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import styles from "./styles.js";

function CarouselItem({ item, index }, parallaxProps) {
  return (
    <Pressable onPress={() => alert("Image description:" + item.description)}>
      <SafeAreaView style={styles.item}>
        <ParallaxImage
          source={item.source} /* источник изображения */
          containerStyle={styles.imageContainer}
          style={styles.image}
          {...parallaxProps} /* передача необходимых свойств */
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </SafeAreaView>
    </Pressable>
  );
}
export default CarouselItem;
