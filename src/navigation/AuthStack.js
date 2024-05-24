import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {myColors} from '../utils/Theme';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Splash from '../screens/Splash/Splash';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
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
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        initialParams={{screenName: 'Login'}}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
