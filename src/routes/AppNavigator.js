import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {myColors} from '../utils/Theme';
import {AuthContext} from '../context/AuthContext';
import Splash from '../screens/Splash/Splash';
import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';
// import VideoPlayer from '../screens/VideoPlayer/VideoPlayer';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', aligItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;