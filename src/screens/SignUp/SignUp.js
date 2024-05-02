import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {myColors} from '../../utils/Theme';
import {CheckBox} from '../../component/CheckBox/CheckBox';

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const {register} = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      alert('Please fill in all fields');
      return;
    }

    await register(email, password);
    navigation.navigate(('AppStack', {screen: 'Home'}));
  };

  const keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <Text style={[styles.greetings, isKeyboardVisible && styles.hidden]}>
        Let's get started
      </Text>

      <Text style={[styles.action, isKeyboardVisible && styles.hidden]}>
        The latest movies and series are here
      </Text>

      <View style={styles.inputView}>
        <View style={styles.placeholder_container_name}>
          <Text style={styles.placeholder}>Full Name</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={name => setFullName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <View style={styles.placeholder_container_email}>
          <Text style={styles.placeholder}>Email Address</Text>
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
          <Text style={styles.placeholder}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          underlineColor="transparent"
          autoCapitalize="none"
          onChangeText={password => setPassword(password)}
        />
      </View>

      <View style={styles.checkbox_container}>
        <CheckBox />
        <Text style={styles.checkbox_text}>
          I agree to the
          <Text style={styles.highlighted_text}> Terms and Services </Text>
          and
          <Text style={styles.highlighted_text}> Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        android_ripple={{color: myColors.PRIMARY_BLUE_ACCENT_COLOR}}>
        <Text style={styles.button_text}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placeholder_container_name: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    width: 83,
  },
  placeholder_container_email: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    width: 110,
  },
  placeholder_container_pass: {
    zIndex: 2,
    paddingLeft: 16,
    top: 10,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    width: 83,
  },
  placeholder: {
    fontSize: 14,
    color: myColors.TEXT_WHITE_GREY_COLOR,
  },
  input: {
    height: 53,
    width: 327,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: myColors.TEXT_DARK_GREY_COLOR,
    color: myColors.TEXT_GREY_COLOR,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  button: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: myColors.PRIMARY_BLUE_ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 16,
    color: myColors.TEXT_WHITE_COLOR,
  },
  hidden: {
    display: 'none',
  },
  checkbox_container: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 40,
    left: -35,
  },
  checkbox_text: {
    right: -8,
    width: 226,
    color: myColors.TEXT_DARK_GREY_COLOR,
  },
  highlighted_text: {
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
  },
});
