import React, {useContext} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {myColors} from '../../utils/Theme';
import {AuthContext} from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;

const {logout} = useContext(AuthContext);

export default function NavigationMenu({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Ваш скроллируемый контент */}
      </ScrollView>
      <View style={[styles.menu, {width: windowWidth}]}>
        <TouchableOpacity
          onPress={() => alert('Link 1 pressed')}
          style={styles.icon}>
          <Feather name="home" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('Link 2 pressed')}
          style={styles.icon}>
          <Feather name="search" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('Link 3 pressed')}
          style={styles.icon}>
          <Feather name="download" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.icon}>
          <Feather name="profile" size={16} color={myColors.TEXT_GREY_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 72, // Учитываем высоту меню
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 72,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});
