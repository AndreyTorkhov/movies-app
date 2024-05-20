import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myColors} from '../../utils/Theme';

const categories = ['All', 'Romance', 'Comedy', 'Thriller', 'Crime', 'Drama'];

export default function CategorySlider({selectedCategory, onCategoryPress}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => onCategoryPress(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && {
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
    marginBottom: 16,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
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
