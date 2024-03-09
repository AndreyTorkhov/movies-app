import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  TEXT_WHITE_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  PRIMARY_SOFT_COLOR,
  TEXT_GREY_COLOR,
} from "../../constant.js";

const movies = [
  {
    title: "Asker VS Semko",
    genre: "Action",
    image: require("../../../assets/icons/for_slider_1.jpg"),
    rating: 6.9,
  },
  {
    title: "Asker VS Semko",
    genre: "Action",
    image: require("../../../assets/icons/for_slider_1.jpg"),
    rating: 6.9,
  },
  {
    title: "Asker VS Semko",
    genre: "Action",
    image: require("../../../assets/icons/for_slider_1.jpg"),
    rating: 6.9,
  },
];

export default function MovieSlider() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Most Popular</Text>
        <TouchableOpacity
          onPress={() => alert("See all clicked")}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={movie.image} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{truncate(movie.title, 15)}</Text>
              <Text style={styles.genre}>{movie.genre}</Text>
              <Text style={styles.rating}>{movie.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function truncate(str, maxLength) {
  return str.length > maxLength ? str.substr(0, maxLength - 3) + "..." : str;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_WHITE_COLOR,
  },
  seeAllButton: {
    padding: 8,
  },
  seeAllButtonText: {
    color: PRIMARY_BLUE_ACCENT_COLOR,
  },
  card: {
    width: 135,
    height: 250,
    marginHorizontal: 8,
    backgroundColor: PRIMARY_SOFT_COLOR,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "77.5%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 10,
  },
  title: {
    color: TEXT_WHITE_COLOR,
    fontSize: 14,
    fontWeight: "bold",
  },
  genre: {
    color: TEXT_GREY_COLOR,
    fontSize: 12,
  },
  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 4,
    borderRadius: 5,
    color: TEXT_WHITE_COLOR,
  },
});
