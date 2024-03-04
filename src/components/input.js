import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

export class Inputs extends Component {
  state = {
    email: "",
    password: "",
    passwordVisible: false,
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = (email, pass) => {
    alert("email: " + email + " password: " + pass);
  };
  render() {
    const { passwordVisible } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={!passwordVisible}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        {/* <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 24,
    height: 53,
    width: 327,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#696974",
    color: "#92929D",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#92929D",
  },
});
