import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myColors} from '../../utils/Theme';

const categories = ['All', 'Porn', 'Comedy', 'Documentary', 'Horror', 'Drama'];

export default function CategorySlider() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryPress = category => {
    const isSelected = selectedCategories.includes(category);
    let updatedCategories = [];
    if (isSelected) {
      updatedCategories = selectedCategories.filter(cat => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) && {
                  color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
                },
              ]}>
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
    width: '100%',
    top: -650,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 24,
    color: myColors.TEXT_WHITE_COLOR,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
  },
  categoryText: {
    color: myColors.TEXT_WHITE_COLOR,
  },
});
