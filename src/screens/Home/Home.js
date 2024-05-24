import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, ScrollView, View, SafeAreaView} from 'react-native';
import {useApi} from '../../apis/Network';
import {myColors} from '../../utils/Theme';
import Feather from 'react-native-vector-icons/Feather';
import MovieSlider from '../../component/MainMovieCardsSlider/MovieSlider';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';
import CustomSlider from '../../component/MainCarousel/CustomSlider';
import {AuthContext} from '../../context/AuthContext';

const Home = ({navigation}) => {
  const {getMovies, getNewMovies, getRating} = useApi();
  const {userInfo} = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);

  // console.log('homePage');
  // console.log(userInfo);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        const newMoviesData = await getNewMovies();

        const moviesWithRatings = await Promise.all(
          moviesData.map(async movie => {
            const rating = await getRating(movie.id);
            return {...movie, estimations: rating.rating};
          }),
        );

        const newMoviesWithRatings = await Promise.all(
          newMoviesData.map(async movie => {
            const rating = await getRating(movie.id);
            return {...movie, estimations: rating.rating};
          }),
        );

        setNewMovies(newMoviesWithRatings);
        setMovies(moviesWithRatings);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section_profile}>
          <View style={styles.container_image}>
            <Feather
              name="user"
              size={24}
              color={myColors.TEXT_LINE_DARK_COLOR}
              style={styles.user}
            />
          </View>
          <View style={styles.section_profile_information}>
            <Text style={styles.section_profile_text_greetings}>
              Hello, dear user
            </Text>
            <Text style={styles.section_profile_text_additionally}>
              We wish you happy viewing!
            </Text>
          </View>
        </View>

        <CustomSlider data={newMovies} userInfo={userInfo} />

        <View style={styles.recommendConteiner}>
          <MovieSlider
            movies={movies}
            title={'Понравится вам'}
            userInfo={userInfo}
          />
        </View>
        <View style={styles.allConteiner}>
          <MovieSlider
            movies={movies}
            title={'Все фильмы'}
            userInfo={userInfo}
          />
        </View>
      </ScrollView>
      <BottomNavigation userInfo={userInfo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    alignSelf: 'flex-start',
    paddingBottom: 120,
  },
  section_profile: {
    paddingTop: 10,
    minHeight: 40,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    marginBottom: 32,
  },
  section_profile_information: {
    flex: 1,
  },
  container_image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
  },
  user: {
    marginTop: 8,
    marginRight: 16,
  },
  section_profile_text_greetings: {
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 16,
  },
  section_profile_text_additionally: {
    color: myColors.TEXT_GREY_COLOR,
    fontSize: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
    color: myColors.TEXT_WHITE_COLOR,
  },
  recommendConteiner: {
    top: -640,
  },
  allConteiner: {
    top: -1170,
  },
});

export default Home;
