import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {myColors} from '../../utils/Theme';

const MovieCard = ({movie}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('VideoPlayer', {movie});
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
        <Image
          source={{uri: `http://10.0.2.2:7000/${movie.horizontal_img}`}}
          style={styles.image}
        />
        <Feather
          name="play"
          size={24}
          color={myColors.TEXT_WHITE_COLOR}
          style={styles.playIcon}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.genre}>{movie.genre}</Text>
        <Text style={styles.title}>{movie.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>movie</Text>
          <Feather
            name="star"
            size={16}
            color={myColors.PRIMARY_OREANGE_COLOR}
          />
          <Text style={styles.ratingEstimation}>{movie.estimations}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
    borderRadius: 16,
    height: 110,
  },
  imageContainer: {
    width: 86,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playIcon: {
    zIndex: 1,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  genre: {
    fontSize: 12,
    color: myColors.TEXT_WHITE_COLOR,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColors.TEXT_WHITE_COLOR,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: myColors.TEXT_GREY_COLOR,
    marginRight: 8,
  },
  ratingEstimation: {
    fontSize: 12,
    color: myColors.PRIMARY_OREANGE_COLOR,
    marginLeft: 4,
  },
});

export default MovieCard;
