import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {myColors} from '../../utils/Theme';
import {AuthContext} from '../../context/AuthContext';

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    await login(email, password);
    navigation.navigate(('AppStack', {screen: 'Home'}));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={[styles.greetings, isKeyboardVisible && styles.hidden]}>
        Hi, Tiffany
      </Text>
      <Text style={[styles.action, isKeyboardVisible && styles.hidden]}>
        Welcome back! Please enter your details.
      </Text>

      <View style={styles.inputView}>
        <View style={styles.placeholder_container_email}>
          <Text style={styles.placeholder_name}>Email Address</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.placeholder_container_pass}>
          <Text style={styles.placeholder_name}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.authorization_btn}
        onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.containerOfHelpWithAuthorization}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOnLoginScreen}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetings: {
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 24,
    marginBottom: 8,
  },
  action: {
    width: 177,
    textAlign: 'center',
    color: myColors.TEXT_WHITE_GREY_COLOR,
    fontSize: 12,
    marginBottom: 64,
  },
  containerOfHelpWithAuthorization: {
    marginBottom: 40,
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
  helpWithAuthorization: {
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
  buttonOnLoginScreen: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
  buttonText: {
    textAlign: 'center',
    lineHeight: 56,
    fontSize: 16,
    color: myColors.TEXT_WHITE_COLOR,
  },
  hidden: {
    display: 'none',
  },
  input: {
    marginBottom: 24,
    height: 53,
    width: 327,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: myColors.TEXT_DARK_GREY_COLOR,
    color: myColors.TEXT_GREY_COLOR,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    backgroundColor: myColors.TEXT_GREY_COLOR,
  },
  placeholder_container_email: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    width: 110,
  },
  placeholder_name: {
    fontSize: 14,
    color: myColors.TEXT_WHITE_GREY_COLOR,
  },
  placeholder_container_pass: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    width: 83,
  },
  authorization_btn: {
    top: -16,
    left: 100,
  },
});
