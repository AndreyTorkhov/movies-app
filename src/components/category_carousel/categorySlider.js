import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  TEXT_WHITE_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  PRIMARY_SOFT_COLOR,
} from "../../constant.js";

const categories = ["All", "Porn", "Comedy", "Dokumentary", "Horror", "Drama"];

export default function CategorySlider() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryPress = (category) => {
    const isSelected = selectedCategories.includes(category);
    let updatedCategories = [];
    if (isSelected) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) && {
                  color: PRIMARY_BLUE_ACCENT_COLOR,
                },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 24,
    color: TEXT_WHITE_COLOR,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: PRIMARY_SOFT_COLOR,
  },
  categoryText: {
    color: TEXT_WHITE_COLOR,
  },
});
