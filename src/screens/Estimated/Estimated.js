import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';
import {myColors} from '../../utils/Theme';
import MovieCard from '../../component/EstimatedMovieCards/MovieCard';
import {useApi} from '../../apis/Network';
import {useRoute} from '@react-navigation/native';

const Estimated = () => {
  const {getUsersRatedMovies, getRating} = useApi();
  const [ratedMovies, setRatedMovies] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const route = useRoute();
  const params = route.params;

  useEffect(() => {
    if (params?.userInfo) {
      setUserInfo(params.userInfo);
    }
  }, [params]);

  useEffect(() => {
    let isMounted = true;

    const fetchRatedMovies = async () => {
      if (!userInfo) return;
      try {
        const ratedMoviesData = await getUsersRatedMovies(userInfo.user.id);
        const moviesWithRatings = await Promise.all(
          ratedMoviesData.map(async movie => {
            const rating = await getRating(movie.id);
            return {...movie, estimations: rating.rating};
          }),
        );
        if (isMounted) {
          setRatedMovies(moviesWithRatings);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch rated movies:', JSON.stringify(error));
        }
      }
    };

    fetchRatedMovies();

    return () => {
      isMounted = false;
    };
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {ratedMovies.length === 0 ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../assets/icons/magic-box.png')}
            style={styles.image}
          />
          <Text style={styles.title}>There Is No Movie Yet!</Text>
          <Text style={styles.text}>
            Find your movie by title or categories
          </Text>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.cardsContainer}>
            {ratedMovies.map(movie => (
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
    marginTop: 70,
    paddingBottom: 70,
  },
  image: {
    marginTop: 150,
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
