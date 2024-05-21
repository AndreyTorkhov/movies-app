import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {myColors} from '../../utils/Theme';
import Feather from 'react-native-vector-icons/Feather';
import StoryLine from '../../component/StoryLineBlock/StoryLine';
import CastAndCrew from '../../component/CastAndCrewBlock/CastAndCrew';
import EstimateModal from '../../component/EstimateModal/EstimateModal';
import MovieSlider from '../../component/MainMovieCardsSlider/MovieSlider';
import {useApi} from '../../api'; // после добавления похожих не понадобится

const castAndCrewData = [
  {
    name: 'Actor 1',
    role: 'Role 1',
    image: 'https://source.unsplash.com/40x40/?men',
  },
  {
    name: 'Actor 2',
    role: 'Role 2',
    image: 'https://source.unsplash.com/40x40/?women',
  },
  {
    name: 'Actor 3',
    role: 'Role 3',
    image: 'https://source.unsplash.com/40x40/?dog',
  },
  {
    name: 'Actor 4',
    role: 'Role 4',
    image: 'https://source.unsplash.com/40x40/?cat',
  },
  {
    name: 'Actor 5',
    role: 'Role 5',
    image: 'https://source.unsplash.com/40x40/?mouse',
  },
];

const Info = ({navigation}) => {
  const route = useRoute();
  const {movie} = route.params;

  // временно для слайдера
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

  // а это уже надо
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayerPress = movie => {
    navigation.navigate('VideoPlayer', {movie});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: movie.img}}
          style={styles.imageBackground}
          opacity={0.1}>
          <Image
            source={{uri: `http://10.0.2.2:7000/${movie.img}`}}
            style={styles.image}></Image>

          <View style={styles.description}>
            <View style={styles.data}>
              <Feather
                name="calendar"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text style={styles.descriptionText}>
                {movie.year_of_creation.substr(0, 4)}
              </Text>
            </View>

            <View style={styles.duration}>
              <Feather
                name="clock"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text
                style={
                  styles.descriptionText
                }>{`${movie.duration} minutes`}</Text>
            </View>

            <View style={styles.genre}>
              <Feather name="film" size={16} color={myColors.TEXT_GREY_COLOR} />
              <Text style={styles.descriptionText}>{`${movie.genre}`}</Text>
            </View>
          </View>

          <View style={styles.estimation}>
            <Feather
              name="star"
              size={16}
              color={myColors.PRIMARY_OREANGE_COLOR}
            />
            <Text style={styles.estimationNum}>{`${movie.estimations}`}</Text>
          </View>

          <View style={styles.infoBtnContainer}>
            <TouchableOpacity
              style={styles.infoBtnPlay}
              onPress={() => handlePlayerPress(movie)}>
              <Feather
                name="play"
                size={16}
                color={myColors.TEXT_WHITE_COLOR}
              />
              <Text style={styles.infoBtnPlayText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBtnEstimations}
              onPress={() => setModalVisible(true)}>
              <Feather
                name="star"
                size={16}
                color={myColors.TEXT_WHITE_COLOR}
              />
              <Text style={styles.infoBtnEstimationsText}>Estimate</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <StoryLine title="Story Line" initialLines={4}>
        For the first time in the cinematic history of Spider-Man, our friendly
        neighborhood hero's identity is revealed, bringing his Super Hero
        responsibilities into conflict with his normal life and putting those he
        cares about most at risk. For the first time in the cinematic history of
        Spider-Man, our friendly neighborhood hero's identity is revealed,
        bringing his Super Hero responsibilities into conflict with his normal
        life and putting those he cares about most at risk.
      </StoryLine>

      <CastAndCrew data={castAndCrewData} />

      <EstimateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        movie={movie}
      />

      <View style={styles.similarConteiner}>
        <MovieSlider movies={movies} title={'Similar'} />
      </View>
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  imageContainer: {
    width: '100%',
    height: 550,
    position: 'relative',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 205,
    height: 285,
    borderRadius: 12,
  },
  description: {
    height: 65,
    width: 275,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  descriptionText: {
    color: myColors.TEXT_GREY_COLOR,
    fontSize: 12,
    marginLeft: 20,
    bottom: 16,
  },
  estimation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#252836',
    width: 55,
    height: 24,
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  estimationNum: {
    color: myColors.PRIMARY_OREANGE_COLOR,
  },
  infoBtnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    width: 245,
    height: 48,
  },
  infoBtnPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    width: 115,
    borderRadius: 32,
    backgroundColor: myColors.PRIMARY_OREANGE_COLOR,
    paddingHorizontal: 32,
  },
  infoBtnPlayText: {
    color: myColors.TEXT_WHITE_COLOR,
    lineHeight: 48,
  },
  infoBtnEstimations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    width: 115,
    borderRadius: 32,
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
    paddingHorizontal: 20,
  },
  infoBtnEstimationsText: {
    color: myColors.TEXT_WHITE_COLOR,
    lineHeight: 48,
  },
  similarConteiner: {},
});
