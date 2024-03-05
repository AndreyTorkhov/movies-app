import * as React from "react";
// import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { PRIMARY_DARK_COLOR, TEXT_WHITE_COLOR } from "./src/constant.js";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
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
            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() => this.props.navigate("Home")}
            //     style={{ marginLeft: 24 }}
            //   >
            //     <Image
            //       source={require("./assets/icons/Back.png")}
            //       style={{ width: 32, height: 32 }}
            //     />
            //   </TouchableOpacity>
            // ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
