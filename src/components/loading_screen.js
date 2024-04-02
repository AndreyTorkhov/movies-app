import React from "react";
import { View, ActivityIndicator, StyleSheet, Text, Image } from "react-native";
import { PRIMARY_BLUE_ACCENT_COLOR, PRIMARY_DARK_COLOR } from "../constant.js";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/live_tv_black_24dp 1.png")}
      ></Image>
      <Text style={styles.title}>CINEMAX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_DARK_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: PRIMARY_BLUE_ACCENT_COLOR,
  },
});
