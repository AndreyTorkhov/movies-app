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
import {myColors} from '../../utils/Theme';
import {CheckBox} from '../../component/CheckBox/CheckBox';
import Feather from 'react-native-vector-icons/Feather';
import StoryLine from '../../component/StoryLineBlock/StoryLine';
import CastAndCrew from '../../component/CastAndCrewBlock/CastAndCrew';

const movies = [
  {
    title: 'Nature',
    genre: 'Action',
    image: {uri: 'https://source.unsplash.com/1024x768/?nature'},
    rating: 8.7,
  },
];

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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={movies[0].image}
          style={styles.imageBackground}
          opacity={0.1}>
          <View style={styles.checkboxContainer}>
            <CheckBox />
          </View>

          <Image source={movies[0].image} style={styles.image}></Image>

          <View style={styles.description}>
            <View style={styles.data}>
              <Feather
                name="calendar"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text style={styles.descriptionText}>2021</Text>
            </View>

            <View style={styles.duration}>
              <Feather
                name="clock"
                size={16}
                color={myColors.TEXT_GREY_COLOR}
              />
              <Text style={styles.descriptionText}>148 minutes</Text>
            </View>

            <View style={styles.genre}>
              <Feather name="film" size={16} color={myColors.TEXT_GREY_COLOR} />
              <Text style={styles.descriptionText}>Action</Text>
            </View>
          </View>

          <View style={styles.estimation}>
            <Feather
              name="star"
              size={16}
              color={myColors.PRIMARY_OREANGE_COLOR}
            />
            <Text style={styles.estimationNum}>4.5</Text>
          </View>

          <View style={styles.infoBtnContainer}>
            <TouchableOpacity
              style={styles.infoBtnPlay}
              onPress={() => {
                alert('Обязательно запустится!');
              }}>
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
