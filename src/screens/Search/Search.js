import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import {Feather} from 'react-native-vector-icons';
import CategorySlider from '../../component/CategorySlider/CategorySlider';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';
import {myColors} from '../../utils/Theme';
import SearchList from '../../component/SearchCardsList/SearchList';
import {useApi} from '../../api';

const SearchScreen = () => {
  const {getMovies} = useApi();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [selectedCategory, searchQuery]);

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const handleSearchChange = text => {
    setSearchQuery(text);
  };

  // const handleCategoryPress = category => {
  //   setSelectedCategory(category);

  //   if (category === 'All') {
  //     setFilteredMovies(movies);
  //   } else {
  //     const filtered = movies.filter(
  //       movie => movie.genre.toLowerCase() === category.toLowerCase(),
  //     );
  //     setFilteredMovies(filtered);
  //   }
  // };

  const filterMovies = () => {
    let filtered = movies;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        movie => movie.genre.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={24}
            color={myColors.TEXT_GREY_COLOR}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>

        <View style={styles.sliderContainer}>
          <CategorySlider
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
          />
        </View>

        <SearchList movies={filteredMovies} />
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  container: {
    paddingBottom: 70,
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
    borderRadius: 24,
    height: 41,
    paddingHorizontal: 10,
    marginVertical: 16,
    width: '85%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  sliderContainer: {
    marginBottom: 16,
  },
});

export default SearchScreen;
