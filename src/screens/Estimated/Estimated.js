import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {myColors} from '../../utils/Theme';
import BottomNavigation from '../../component/BottomNavigation/BottomNavigation';

const Estimated = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/magic-box 1.png')}
          style={styles.image}></Image>
        <Text style={styles.title}>There Is No Movie Yet!</Text>
        <Text style={styles.text}>Find your movie by title or categories</Text>
      </View>
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
});
