import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useMovieRatings} from '../../context/RatingContext';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';
import {myColors} from '../../utils/Theme';
import MovieCard from '../../component/EstimatedMovieCards/MovieCard';

const Estimated = () => {
  const {ratings} = useMovieRatings();

  return (
    <SafeAreaView style={styles.safeArea}>
      {Object.keys(ratings).length === 0 ? (
        <>
          <View style={styles.container}>
            <Image
              source={require('../../assets/icons/magic-box.png')}
              style={styles.image}></Image>
            <Text style={styles.title}>There Is No Movie Yet!</Text>
            <Text style={styles.text}>
              Find your movie by title or categories
            </Text>
          </View>
        </>
      ) : (
        <ScrollView>
          <View style={styles.cardsContainer}>
            {Object.values(ratings).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </View>
        </ScrollView>
      )}
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default Estimated;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  container: {
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  image: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: myColors.TEXT_WHITE_COLOR,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: myColors.TEXT_GREY_COLOR,
  },
  cardsContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 24,
  },
});
