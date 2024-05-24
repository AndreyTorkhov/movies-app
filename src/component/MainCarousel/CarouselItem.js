import React from 'react';
import {
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {myColors} from '../../utils/Theme';

const {width} = Dimensions.get('window');

function CarouselItem({item, index, data, userInfo}) {
  const navigation = useNavigation();

  // console.log('carouselItem');
  // console.log(userInfo);

  const handleMoviePress = (movie, userInfo) => {
    navigation.navigate('Info', {movie, userInfo});
  };
  return (
    <Pressable onPress={() => handleMoviePress(data[index], userInfo)}>
      <SafeAreaView style={styles.item}>
        <Image
          source={item.source}
          containerStyle={styles.imageContainer}
          style={styles.image}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {`on ${item.date}`}
        </Text>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: width * 0.75,
    height: 155,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: myColors.TEXT_WHITE_COLOR,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 14,
  },
});

export default CarouselItem;
