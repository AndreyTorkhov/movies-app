import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {AuthContext} from '../../context/AuthContext';
import {myColors} from '../../utils/Theme';
import {CheckBox} from '../../component/CheckBox/CheckBox';
import Feather from 'react-native-vector-icons/Feather';
import CategorySlider from '../../component/CategorySlider/CategorySlider';
import MovieSlider from '../../component/MainMovieCardsSlider/MovieSlider';

const Home = ({navigation}) => {
  const [images] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
  ]);

  const {logout} = useContext(AuthContext);

  const [searchVisible, setSearchVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setSearchVisible(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setSearchVisible(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section_profile}>
        <View style={styles.container_image}>
          <Image
            source={{uri: 'https://source.unsplash.com/1024x768/?men'}}
            style={styles.image}
          />
        </View>
        <View style={styles.section_profile_information}>
          <Text style={styles.section_profile_text_greetings}>
            Hello, узкоглазый
          </Text>
          <Text style={styles.section_profile_text_additionally}>
            Я люблю когда волосатые мужики обмазываются маслом
          </Text>
        </View>
        <View style={styles.checkbox_сontainer}>
          <CheckBox />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => {
            alert('поиск не работает');
          }}>
          <Feather name="search" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search a title.."
          placeholderTextColor={myColors.TEXT_GREY_COLOR}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            alert('настройки не работают');
          }}>
          <Feather name="settings" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <SliderBox
          images={images}
          sliderBoxHeight={155}
          resizeMethod="resize"
          resizeMode="cover"
          dotColor={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          inactiveDotColor="rgba(18, 205, 217, 0.5)"
          dotStyle={styles.dotStyle}
          paginationBoxStyle={styles.paginationBoxStyle}
          circleLoop
          ImageComponentStyle={styles.imageComponentStyle}
          imageLoadingColor={myColors.PRIMARY_BLUE_ACCENT_COLOR}
        />
      )}

      {searchVisible && <CategorySlider />}
      {searchVisible && <MovieSlider />}
      {searchVisible && (
        <TouchableOpacity onPress={() => logout()} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingBottom: 12,
  },
  signOutButton: {
    position: 'absolute',
    top: 750,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
  signOutButtonText: {
    color: myColors.TEXT_WHITE_COLOR,
  },
  dotStyle: {
    width: 12,
    height: 12,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  paginationBoxStyle: {
    position: 'absolute',
    padding: 0,
    top: -480,
    flexDirection: 'row',
  },
  imageComponentStyle: {
    width: 295,
    borderRadius: 16,
  },
  section_profile: {
    paddingTop: 10,
    minHeight: 40,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    marginBottom: 32,
  },
  section_profile_information: {
    flex: 1,
  },
  checkbox_сontainer: {
    width: 32,
    height: 32,
    top: 8,
    marginLeft: 40,
  },
  container_image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
    backgroundColor: myColors.TEXT_WHITE_COLOR,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50,
  },
  section_profile_text_greetings: {
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 16,
  },
  section_profile_text_additionally: {
    color: myColors.TEXT_GREY_COLOR,
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 10,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
    color: myColors.TEXT_WHITE_COLOR,
  },
});

export default Home;
