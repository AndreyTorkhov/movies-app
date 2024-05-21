import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View, SafeAreaView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useApi} from '../../api';
import {myColors} from '../../utils/Theme';
import Feather from 'react-native-vector-icons/Feather';
import MovieSlider from '../../component/MainMovieCardsSlider/MovieSlider';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';

const Home = ({navigation}) => {
  const [images] = useState([
    'https://source.unsplash.com/1024x768/?ryan_gosling',
    'https://source.unsplash.com/1024x768/?films',
    'https://source.unsplash.com/1024x768/?new_film',
  ]);

  const {getMovies} = useApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
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

        <SliderBox
          images={images}
          sliderBoxHeight={155}
          dotColor={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          inactiveDotColor="rgba(18, 205, 217, 0.5)"
          dotStyle={styles.dotStyle}
          paginationBoxStyle={styles.paginationBoxStyle}
          circleLoop
          ImageComponentStyle={styles.imageComponentStyle}
          imageLoadingColor={myColors.PRIMARY_BLUE_ACCENT_COLOR}
        />

        <View style={styles.recommendConteiner}>
          <MovieSlider movies={movies} title={'Recommend for you'} />
        </View>
        <View style={styles.allConteiner}>
          <MovieSlider movies={movies} title={'All movies'} />
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingBottom: 120,
  },
  dotStyle: {
    width: 12,
    height: 12,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  paginationBoxStyle: {
    padding: 0,
    top: -480,
    flexDirection: 'row',
  },
  imageComponentStyle: {
    width: 295,
    borderRadius: 16,
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
