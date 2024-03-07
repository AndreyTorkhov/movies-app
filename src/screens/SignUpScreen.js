import React from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Inputs } from "../components/input.js";
import { CheckBox } from "../components/check_box.js";
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
  TEXT_DARK_GREY_COLOR,
  TEXT_GREY_COLOR,
} from "../constant.js";

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardVisible: false,
      isFullNameFilled: false,
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <Text style={[styles.greetings, isKeyboardVisible && styles.hidden]}>
          Let's get started
        </Text>
        <Text style={[styles.action, isKeyboardVisible && styles.hidden]}>
          The latest movies and series are here
        </Text>
        <View style={styles.placeholder_container_name}>
          <Text style={styles.placeholder_name}>Full Name</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={this.handleFullNameChange}
        />
        <Inputs />
        <View style={styles.checkboxContainer}>
          <CheckBox />
          <Text style={styles.checkboxLabel}>
            I agree to the Terms and Services and Privacy Policy
          </Text>
        </View>
        <Pressable
          color={PRIMARY_BLUE_ACCENT_COLOR}
          style={styles.buttonOnLoginScreen}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
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
    marginBottom: 8,
  },
  action: {
    width: 177,
    textAlign: "center",
    color: TEXT_WHITE_GREY_COLOR,
    fontSize: 12,
    marginBottom: 64,
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
  placeholder_name: {
    fontSize: 14,
    color: TEXT_WHITE_GREY_COLOR,
  },
  placeholder_container_name: {
    zIndex: 2,
    paddingLeft: 10,
    top: 10,
    backgroundColor: PRIMARY_DARK_COLOR,
    width: 83,
    left: -113,
  },
  checkboxContainer: {
    width: 258,
    flexDirection: "row",
    alignItems: "flex-start",
    left: -30,
    marginBottom: 40,
  },
  checkboxLabel: {
    color: TEXT_WHITE_GREY_COLOR,
    fontSize: 14,
    marginLeft: 8,
  },
  hidden: {
    display: "none",
  },
});
