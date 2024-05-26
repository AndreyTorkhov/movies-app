import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {myColors} from '../../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../config';
import Feather from 'react-native-vector-icons/Feather';

function truncate(str, maxLength) {
  return str.length > maxLength ? str.substr(0, maxLength - 3) + '...' : str;
}

const SearchList = ({movies, userInfo}) => {
  const navigation = useNavigation();

  const handleMoviePress = (movie, userInfo) => {
    navigation.navigate('Info', {movie, userInfo});
  };

  return (
    <ScrollView contentContainerStyle={styles.cardsContainer}>
      {movies.map(movie => (
        <TouchableOpacity
          key={movie.id}
          style={styles.card}
          onPress={() => handleMoviePress(movie, userInfo)}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `${API_URL}${movie.main_img}`}}
              style={styles.image}
            />
            {movie.estimations && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{movie.estimations}</Text>
              </View>
            )}
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.subStatus}>
              <Text style={styles.statusText}>{'free'}</Text>
            </View>
            <Text style={styles.titleText}>{truncate(movie.name, 20)}</Text>
            <View style={styles.durationContainer}>
              <Feather
                name="clock"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text style={styles.durationText}>{movie.duration}</Text>
            </View>
            <View style={styles.yearContainer}>
              <Feather
                name="calendar"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text style={styles.yearText}>
                {movie.year_of_creation.substr(0, 4)}
              </Text>
            </View>
            <View style={styles.genreContainer}>
              <Feather name="film" size={16} color={myColors.TEXT_GREY_COLOR} />
              <Text style={styles.genreTitle}>{'Жанр |'}</Text>
              <Text style={styles.genreText}>{movie.genre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    flexDirection: 'row',
    height: 150,
    width: '100vw',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 112,
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: myColors.TEXT_GREY_COLOR,
    width: 55,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: myColors.TEXT_WHITE_COLOR,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  statusText: {
    color: myColors.TEXT_WHITE_COLOR,
    textAlign: 'center',
  },
  subStatus: {
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
    width: 65,
    marginBottom: 12,
    borderRadius: 6,
  },
  titleText: {
    color: myColors.TEXT_WHITE_COLOR,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  durationText: {
    marginLeft: 4,
    color: myColors.TEXT_GREY_COLOR,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  yearText: {
    marginLeft: 4,
    color: myColors.TEXT_GREY_COLOR,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
  },
  genreTitle: {
    marginLeft: 4,
    color: myColors.TEXT_GREY_COLOR,
  },

  genreText: {
    marginLeft: 4,
    color: myColors.TEXT_WHITE_COLOR,
  },
});
