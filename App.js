import * as React from "react";
import "./ignoreWarnings.js";
// import { Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ ...commonScreenOptions, headerShown: false }}
        />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
