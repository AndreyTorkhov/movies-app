import React from "react";
import { Platform } from "react-native";
import {
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Inputs } from "../components/input.js";
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
} from "../constant.js";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardVisible: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardVisible: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardVisible: false });
  };

  render() {
    const { isKeyboardVisible } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.greetings, isKeyboardVisible && styles.hidden]}>
          Hi, Tiffany
        </Text>
        <Text style={[styles.action, isKeyboardVisible && styles.hidden]}>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: PRIMARY_DARK_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  greetings: {
    color: TEXT_WHITE_COLOR,
    fontSize: 24,
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
  hidden: {
    display: "none",
  },
});
