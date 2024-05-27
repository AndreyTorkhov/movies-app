import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BlurView} from 'expo-blur';
import Feather from 'react-native-vector-icons/Feather';
import {myColors} from '../../utils/Theme';
import {useApi} from '../../apis/Network';

const {width, height} = Dimensions.get('window');

const EstimateModal = ({visible, onClose, movie, userInfo}) => {
  const {postRating} = useApi();

  const [rating, setRating] = useState(0);

  const handleStarPress = index => {
    const newRating = index + 1;
    setRating(newRating);
  };

  console.log('фильм:');
  console.log(movie.id);
  console.log('юзер:');
  console.log(userInfo.user.id);
  console.log('оценка:');
  console.log(rating);

  const handleClose = async () => {
    if (rating >= 1 && rating <= 5) {
      try {
        await postRating(movie.id, userInfo.user.id, rating);
      } catch (error) {
        console.error('Failed to post rating:', JSON.stringify(error));
      }
    }
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <BlurView style={styles.blur} intensity={70} tint="light" />
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Feather name="x" size={24} color={myColors.TEXT_GREY_COLOR} />
          </TouchableOpacity>
          <Text style={styles.title}>Твоя оценка</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}>
                <Feather
                  name="star"
                  size={49}
                  color={index < rating ? '#FFD700' : '#B0B0B0'}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EstimateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: width - 48,
    height: height * 0.4,
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 24,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 19,
    width: 40,
    height: 40,
    backgroundColor: myColors.PRIMARY_SOFT_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: myColors.TEXT_WHITE_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20%',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  star: {
    marginHorizontal: 8,
  },
});
