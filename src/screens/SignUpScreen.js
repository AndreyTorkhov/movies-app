import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { API_URL } from "../../config";
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
  TEXT_DARK_GREY_COLOR,
  TEXT_GREY_COLOR,
} from "../constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSignUp = async () => {
    let token;
    try {
      const response = await axios.post(`${API_URL}registration`, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      token = response.data.accessToken;
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Full Name</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={handleFullNameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Email Address</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={handlePasswordChange}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={handleSignUp}
        android_ripple={{ color: PRIMARY_BLUE_ACCENT_COLOR }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
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
  inputContainer: {
    marginBottom: 24,
  },
  placeholder: {
    fontSize: 14,
    color: TEXT_WHITE_GREY_COLOR,
  },
  input: {
    height: 53,
    width: 327,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: TEXT_DARK_GREY_COLOR,
    color: TEXT_GREY_COLOR,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  button: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: PRIMARY_BLUE_ACCENT_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: TEXT_WHITE_COLOR,
  },
  hidden: {
    display: "none",
  },
});
