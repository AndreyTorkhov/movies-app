import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Inputs } from "../components/input.js";

export class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greetings}>Hi, Tiffany</Text>
        <Text style={styles.action}>
          Welcome back! Please enter your details.
        </Text>
        <Inputs style={styles.input} />
        <TouchableOpacity style={styles.containerOfHelpWithAuthorization}>
          <Text style={styles.helpWithAuthorization}>Forgot Password?</Text>
        </TouchableOpacity>
        <Pressable
          color="#12CDD9"
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
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
  },
  greetings: {
    color: "#FFFFFF",
    fontSize: 24,
    // fontFamily: "Montserrat-SemiBold",
    marginBottom: 8,
  },
  action: {
    width: 177,
    textAlign: "center",
    color: "#F1F1F5",
    fontSize: 12,
    marginBottom: 64,
  },
  containerOfHelpWithAuthorization: {
    top: -16,
    left: 100,
    marginBottom: 40,
  },
  helpWithAuthorization: {
    color: "#12CDD9",
  },
  buttonOnLoginScreen: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: "#12CDD9",
  },
  buttonText: {
    textAlign: "center",
    lineHeight: 56,
    fontSize: 16,
    color: "white",
  },
});
