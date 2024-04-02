import React, { useState, useEffect } from "react";
import "./ignoreWarnings.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { LoadingScreen } from "./src/components/loading_screen.js";
import { PRIMARY_DARK_COLOR, TEXT_WHITE_COLOR } from "./src/constant.js";

const commonScreenOptions = {
  headerTransparent: true,
  headerTintColor: TEXT_WHITE_COLOR,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainerStyle: {
    backgroundColor: PRIMARY_DARK_COLOR,
    flex: 1,
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator
          screenOptions={commonScreenOptions}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ ...commonScreenOptions, headerShown: false }}
          />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
