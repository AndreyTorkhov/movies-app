import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {myColors} from '../../utils/Theme';
import {AuthContext} from '../../context/AuthContext';

const Home = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <Text style={{color: myColors.TEXT_WHITE_COLOR}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
