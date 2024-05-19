import React, {useRef, useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Video} from 'expo-av';
import {myColors} from '../../utils/Theme';

const VideoPlayerModal = () => {
  const route = useRoute();
  const {movie} = route.params;

  const videoRef = useRef(null);
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.text}>{movie.name}</Text>
      <Video
        ref={videoRef}
        source={{uri: `http://10.0.2.2:7000/${movie.video}`}}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
  },
  text: {
    color: myColors.TEXT_WHITE_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
  },
  video: {
    width: '100%',
    height: '50%',
  },
});

export default VideoPlayerModal;
