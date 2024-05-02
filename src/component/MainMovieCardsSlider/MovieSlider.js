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
import {useNavigation} from '@react-navigation/native'; // импорт

const movies = [
  {
    title: 'Nature',
    genre: 'Action',
    image: {uri: 'https://source.unsplash.com/1024x768/?nature'},
    rating: 8.7,
  },
  {
    title: 'Summer',
    genre: 'Action',
    image: {uri: 'https://source.unsplash.com/1024x768/?summer'},
    rating: 10.0,
  },
  {
    title: 'Winter',
    genre: 'Action',
    image: {uri: 'https://source.unsplash.com/1024x768/?winter'},
    rating: 5.2,
  },
];

export default function MovieSlider() {
  const navigation = useNavigation(); // получение функции навигации

  const handleMoviePress = () => {
    navigation.navigate('Info'); // переход на экран "Info"
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Most Popular</Text>
        <TouchableOpacity
          onPress={() => alert('что тебе еще там надо?')}
          style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={handleMoviePress}>
            <Image source={movie.image} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{truncate(movie.title, 15)}</Text>
              <Text style={styles.genre}>{movie.genre}</Text>
              <Text style={styles.rating}>{movie.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function truncate(str, maxLength) {
  return str.length > maxLength ? str.substr(0, maxLength - 3) + '...' : str;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    top: -640,
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
  seeAllButton: {
    padding: 8,
  },
  seeAllButtonText: {
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
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
