import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {myColors} from '../../utils/Theme';
import {AuthContext} from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const BottomNavigation = ({userInfo}) => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  // console.log('bottomNav');
  // console.log(userInfo);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Feather
          name="home"
          size={24}
          color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Search', {userInfo})}>
        <Feather
          name="search"
          size={24}
          color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Estimated', {userInfo})}>
        <Feather
          name="eye"
          size={24}
          color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => logout()} style={styles.button}>
        <Feather
          name="log-out"
          size={24}
          color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 72,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  button: {
    borderRadius: 16,
    width: 50,
    height: 50,
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    textAlign: 'center',
  },
});

export default BottomNavigation;
