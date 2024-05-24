import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myColors} from '../../utils/Theme';
import {useApi} from '../../apis/Network';

export default function CategorySlider({selectedCategory, onCategoryPress}) {
  const [categories, setCategories] = useState(['All']);
  const {getMovies} = useApi();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movies = await getMovies();
        const genres = movies.reduce((acc, movie) => {
          if (movie.genre && !acc.includes(movie.genre)) {
            acc.push(movie.genre);
          }
          return acc;
        }, []);
        setCategories(['All', ...genres]);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

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
