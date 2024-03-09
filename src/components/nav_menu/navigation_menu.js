import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { PRIMARY_DARK_COLOR, TEXT_WHITE_COLOR } from "../../constant.js";

const windowWidth = Dimensions.get("window").width;

export default function NavigationMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Ваш скроллируемый контент */}
      </ScrollView>
      <View style={[styles.menu, { width: windowWidth }]}>
        <TouchableOpacity
          onPress={() => alert("Link 1 pressed")}
          style={styles.icon}
        >
          <Image
            source={require("../../../assets/icons/home.png")}
            style={[styles.menuIcon, { tintColor: TEXT_WHITE_COLOR }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("Link 2 pressed")}
          style={styles.icon}
        >
          <Image
            source={require("../../../assets/icons/search.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.icon}
        >
          <Image
            source={require("../../../assets/icons/download.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sign Up")}
          style={styles.icon}
        >
          <Image
            source={require("../../../assets/icons/person.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_DARK_COLOR,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 72, // Учитываем высоту меню
  },
  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 72,
    backgroundColor: PRIMARY_DARK_COLOR,
  },
  icon: {
    flex: 1,
    alignItems: "center",
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});
