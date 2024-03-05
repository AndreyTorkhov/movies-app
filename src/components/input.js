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
import {
  TEXT_DARK_GREY_COLOR,
  TEXT_GREY_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
  PRIMARY_DARK_COLOR,
} from "../constant.js";

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
        <View style={styles.placeholder_container_email}>
          <Text style={styles.placeholder_name}>Email Address</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <View style={styles.placeholder_container_pass}>
          <Text style={styles.placeholder_name}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
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
    borderColor: TEXT_DARK_GREY_COLOR,
    color: TEXT_GREY_COLOR,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    backgroundColor: TEXT_GREY_COLOR,
  },
  placeholder_container_email: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: PRIMARY_DARK_COLOR,
    width: 115,
  },
  placeholder_name: {
    fontSize: 14,
    color: TEXT_WHITE_GREY_COLOR,
  },
  placeholder_container_pass: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: PRIMARY_DARK_COLOR,
    width: 83,
  },
});
