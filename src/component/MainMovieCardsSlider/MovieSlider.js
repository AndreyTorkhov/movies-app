import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {myColors} from '../../utils/Theme.js';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../config.js';

function truncate(str, maxLength) {
  return str.length > maxLength ? str.substr(0, maxLength - 3) + '...' : str;
}

const MovieSlider = ({movies, title, userInfo}) => {
  const navigation = useNavigation();

  // console.log('movieSliders');
  // console.log(userInfo);

  const handleMoviePress = (movie, userInfo) => {
    navigation.navigate('Info', {movie, userInfo});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <TouchableOpacity
            key={movie.id}
            style={styles.card}
            onPress={() => handleMoviePress(movie, userInfo)}>
            <Image
              source={{uri: `${API_URL}${movie.main_img}`}}
              style={styles.image}
            />
            <View style={styles.overlay}>
              <Text style={styles.title}>{truncate(movie.name, 14)}</Text>
              <Text style={styles.genre}>{movie.genre}</Text>
              {movie.estimations !== undefined && (
                <Text style={styles.rating}>{movie.estimations}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieSlider;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: myColors.TEXT_WHITE_COLOR,
  },
  card: {
    width: 135,
    height: 250,
    marginHorizontal: 8,
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '77.5%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  genre: {
    color: myColors.TEXT_GREY_COLOR,
    fontSize: 12,
  },
  rating: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 5,
    color: myColors.TEXT_WHITE_COLOR,
  },
});
