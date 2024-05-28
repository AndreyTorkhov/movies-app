import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {myColors} from '../../utils/Theme';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        size="large"
        color={myColors.PRIMARY_BLUE_ACCENT_COLOR}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
