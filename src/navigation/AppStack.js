import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {myColors} from '../utils/Theme';
import Splash from '../screens/Splash/Splash';
import Info from '../screens/InfoAboutFilm/Info';
import Home from '../screens/Home/Home';
import VideoPlayerModal from '../screens/VideoPlayerModel/VideoPlayerModal';
import AuthStack from './AuthStack';
import Estimated from '../screens/Estimated/Estimated';
import Search from '../screens/Search/Search';
import {RatingProvider} from '../context/RatingContext';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <RatingProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerModal} />
        <Stack.Screen
          name="Estimated"
          component={Estimated}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </RatingProvider>
  );
};

export default AppStack;

const commonScreenOptions = {
  headerTransparent: true,
  headerTintColor: myColors.TEXT_WHITE_COLOR,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    flex: 1,
  },
};
