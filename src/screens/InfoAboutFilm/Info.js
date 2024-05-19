import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import {useRoute} from '@react-navigation/native';
import {myColors} from '../../utils/Theme';
import {CheckBox} from '../../component/CheckBox/CheckBox';
import Feather from 'react-native-vector-icons/Feather';
import StoryLine from '../../component/StoryLineBlock/StoryLine';
import CastAndCrew from '../../component/CastAndCrewBlock/CastAndCrew';

// const movies = [
//   {
//     title: 'Nature',
//     genre: 'Action',
//     image: {uri: 'https://source.unsplash.com/1024x768/?nature'},
//     rating: 8.7,
//   },
// ];

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

  const handlePlayerPress = movie => {
    navigation.navigate('VideoPlayer', {movie});
  };

  console.log('вот че попало в info:');
  console.log(movie);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: movie.img}}
          style={styles.imageBackground}
          opacity={0.1}>
          <View style={styles.checkboxContainer}>
            <CheckBox />
          </View>

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
              style={styles.infoBtnDownload}
              onPress={() => {
                alert('Обязательно запустится!');
              }}>
              <Feather
                name="download"
                size={16}
                color={myColors.PRIMARY_OREANGE_COLOR}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBtnShare}
              onPress={() => {
                alert('Обязательно запустится!');
              }}>
              <Feather
                name="share"
                size={16}
                color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
              />
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
  checkboxContainer: {
    width: 32,
    height: 32,
    position: 'absolute',
    right: 24,
    top: 16,
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
  infoBtnDownload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252836',
    height: 48,
    width: 48,
    borderRadius: 90,
  },
  infoBtnShare: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252836',
    height: 48,
    width: 48,
    borderRadius: 90,
  },
});
