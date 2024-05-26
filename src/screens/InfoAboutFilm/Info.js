import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {API_URL} from '../../config';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {myColors} from '../../utils/Theme';
import Feather from 'react-native-vector-icons/Feather';
import StoryLine from '../../component/StoryLineBlock/StoryLine';
import EstimateModal from '../../component/EstimateModal/EstimateModal';
import MovieSlider from '../../component/MainMovieCardsSlider/MovieSlider';
import {useApi} from '../../apis/Network';

const Info = ({navigation}) => {
  const route = useRoute();
  const {movie, userInfo: initialUserInfo} = route.params;

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  useEffect(() => {
    if (initialUserInfo) {
      setUserInfo(initialUserInfo);
    }
  }, [initialUserInfo]);

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

  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayerPress = movie => {
    navigation.navigate('VideoPlayer', {movie});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: movie.main_img}}
          style={styles.imageBackground}
          opacity={0.1}>
          <Image
            source={{uri: `${API_URL}${movie.main_img}`}}
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
                }>{`${movie.duration} минуты`}</Text>
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
            {movie.estimations !== null ? (
              <Text style={styles.estimationNum}>{`${movie.estimations}`}</Text>
            ) : (
              <Text style={styles.estimationText}>
                никем не оценено, будь первым!
              </Text>
            )}
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
              <Text style={styles.infoBtnPlayText}>Смотреть</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBtnEstimations}
              onPress={() => setModalVisible(true)}>
              <Feather
                name="star"
                size={16}
                color={myColors.TEXT_WHITE_COLOR}
              />
              <Text style={styles.infoBtnEstimationsText}>Оценить</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <StoryLine title="Сюжет" initialLines={4}>
        {movie.descr}
      </StoryLine>

      <EstimateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        movie={movie}
        userInfo={userInfo}
      />

      <View style={styles.similarConteiner}>
        <MovieSlider movies={movies} title={'Похожие фильмы'} />
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
    minWidth: 55,
    width: 'min-content',
    height: 24,
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  estimationNum: {
    color: myColors.PRIMARY_OREANGE_COLOR,
  },
  estimationText: {
    color: myColors.PRIMARY_OREANGE_COLOR,
    fontSize: 14,
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
    paddingHorizontal: 20,
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
