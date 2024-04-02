import React, { useState, useEffect } from "react";
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_BLUE_ACCENT_COLOR,
  TEXT_DARK_GREY_COLOR,
  TEXT_GREY_COLOR,
  TEXT_WHITE_COLOR,
  TEXT_WHITE_GREY_COLOR,
} from "../constant";
import { API_URL } from "../../config";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data.accessToken;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const accessToken = await loginUser(email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.greetings, isKeyboardVisible && styles.hidden]}>
        Hi, Tiffany
      </Text>
      <Text style={[styles.action, isKeyboardVisible && styles.hidden]}>
        Welcome back! Please enter your details.
      </Text>

      <View>
        <View style={styles.placeholder_container_email}>
          <Text style={styles.placeholder_name}>Email Address</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <View style={styles.placeholder_container_pass}>
          <Text style={styles.placeholder_name}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Sign Up")}
        style={styles.containerOfHelpWithAuthorization}
      >
        <Text style={styles.helpWithAuthorization}>Forgot Password?</Text>
      </TouchableOpacity>

      <Pressable
        color={PRIMARY_BLUE_ACCENT_COLOR}
        style={styles.buttonOnLoginScreen}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </ScrollView>
  );
};

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
