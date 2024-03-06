import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Inputs } from "../components/input.js";
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
} from "../constant.js";

export class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>Hi, Tiffany</Text>
        <Text style={styles.action}>
          Welcome back! Please enter your details.
        </Text>

        <Inputs />
        <TouchableOpacity style={styles.containerOfHelpWithAuthorization}>
          <Text style={styles.helpWithAuthorization}>Forgot Password?</Text>
        </TouchableOpacity>
        <Pressable
          color={PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.buttonOnLoginScreen}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_DARK_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  greetings: {
    color: TEXT_WHITE_COLOR,
    fontSize: 24,
    // fontFamily: "Montserrat-SemiBold",
    marginBottom: 8,
  },
  action: {
    width: 177,
    textAlign: "center",
    color: TEXT_WHITE_GREY_COLOR,
    fontSize: 12,
    marginBottom: 64,
  },
  containerOfHelpWithAuthorization: {
    top: -16,
    left: 100,
    marginBottom: 40,
  },
  helpWithAuthorization: {
    color: PRIMARY_BLUE_ACCENT_COLOR,
  },
  buttonOnLoginScreen: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: PRIMARY_BLUE_ACCENT_COLOR,
  },
  buttonText: {
    textAlign: "center",
    lineHeight: 56,
    fontSize: 16,
    color: TEXT_WHITE_COLOR,
  },
});
