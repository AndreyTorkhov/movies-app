import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {myColors} from '../../utils/Theme';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    const {screenName} = route.params;
    setTimeout(() => {
      navigation.replace(screenName);
    }, 1000);
  }, [navigation, route.params]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../../assets/icons/splash.png')}></Image>
      <Text style={styles.title}>Cinemax</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
});
