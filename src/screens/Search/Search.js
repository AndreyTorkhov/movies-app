import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import CategorySlider from '../../component/CategorySlider/CategorySlider';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';
import {myColors} from '../../utils/Theme';
import SearchList from '../../component/SearchCardsList/SearchList';
import {useApi} from '../../apis/Network';
import Loader from '../../component/Loader/Loader';

const SearchScreen = () => {
  const {getMovies, getRating} = useApi();
  const route = useRoute();
  const {userInfo} = route.params;
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await getMovies();
        const moviesWithRatings = await Promise.all(
          moviesData.map(async movie => {
            const ratingData = await getRating(movie.id);
            return {
              ...movie,
              estimations: ratingData?.rating || null,
            };
          }),
        );
        setMovies(moviesWithRatings);
        setFilteredMovies(moviesWithRatings);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setLoading(false);
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
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>

        <View style={styles.sliderContainer}>
          <CategorySlider
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
            userInfo={userInfo}
          />
        </View>

        <View style={styles.cardsContainer}>
          {loading ? (
            <Loader />
          ) : (
            <SearchList movies={filteredMovies} userInfo={userInfo} />
          )}
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default SearchScreen;

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
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
