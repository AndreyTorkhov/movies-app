import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions, // Импортируем Dimensions
} from "react-native";
import {
  TEXT_WHITE_COLOR,
  PRIMARY_DARK_COLOR,
  TEXT_GREY_COLOR,
  PRIMARY_SOFT_COLOR,
} from "../constant.js";
import { CheckBox } from "../components/check_box.js";
import data from "../components/carousel/data.js";
import CustomSlider from "../components/carousel/customSlider.js";
import CategorySlider from "../components/category_carousel/categorySlider.js";
import MovieSlider from "../components/movies_slider/movie_slider.js";
import NavigationMenu from "../components/nav_menu/navigation_menu.js";

export default HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 72, // Учитываем высоту меню
        }}
      >
        <View style={styles.section_profile}>
          <View style={styles.container_image}>
            <Image
              source={require("../../assets/icons/profile_test.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.section_profile_information}>
            <Text style={styles.section_profile_text_greetings}>
              Hello, узкоглазый
            </Text>
            <Text style={styles.section_profile_text_additionally}>
              Я люблю когда волосатые мужики обмазываются маслом
            </Text>
          </View>
          <View style={styles.checkbox_сontainer}>
            <CheckBox />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              // Действия по нажатию на иконку с расширенными настройками
            }}
          >
            <Image
              source={require("../../assets/icons/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search a title.."
            placeholderTextColor={TEXT_GREY_COLOR}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              // Действия по нажатию на иконку с расширенными настройками
            }}
          >
            <Image
              source={require("../../assets/icons/search_setings.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>

        <CustomSlider data={data} />
        <CategorySlider />
        <MovieSlider />
      </ScrollView>
      <NavigationMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_DARK_COLOR,
    paddingTop: 70,
  },
  section_profile: {
    minHeight: 40,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: "row",
    marginBottom: 32,
  },
  section_profile_information: {
    flex: 1,
  },
  checkbox_сontainer: {
    width: 32,
    height: 32,
    top: 8,
    marginLeft: 40,
  },
  container_image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
    backgroundColor: TEXT_WHITE_COLOR,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
  },
  section_profile_text_greetings: {
    color: TEXT_WHITE_COLOR,
    fontSize: 16,
  },
  section_profile_text_additionally: {
    color: TEXT_GREY_COLOR,
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 10,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor: PRIMARY_SOFT_COLOR,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: TEXT_WHITE_COLOR,
  },
  settingsIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
