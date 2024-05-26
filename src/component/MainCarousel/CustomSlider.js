import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import {myColors} from '../../utils/Theme';
import {format} from 'date-fns';
import {API_URL} from '../../config';

const {width} = Dimensions.get('window');

const formatDate = dateString => {
  const date = new Date(dateString);
  return format(date, 'MMMM dd, yyyy');
};

const transformData = data => {
  return data.map(item => ({
    title: item.name,
    date: formatDate(item.year_of_creation),
    source: {uri: `${API_URL}${item.horizontal_img}`},
  }));
};

const CustomSlider = ({data, userInfo}) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [carouselData, setCarouselData] = useState([]);

  // console.log('customSlider');
  // console.log(userInfo);

  useEffect(() => {
    const transformedData = transformData(data);
    setCarouselData(transformedData);
  }, [data]);

  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width * 0.75,
    data: carouselData,
    renderItem: ({item, index}) => (
      <CarouselItem item={item} index={index} data={data} userInfo={userInfo} />
    ),
    hasParallaxImages: true,
    onSnapToItem: index => setActiveDotIndex(index),
  };

  return (
    <View style={styles.container}>
      <Carousel {...settings} />
      <View style={styles.dotsContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeDotIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  container: {},
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
  inactiveDot: {
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
    opacity: 0.3,
  },
});
