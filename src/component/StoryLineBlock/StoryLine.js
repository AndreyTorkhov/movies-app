import React, {useState} from 'react';
import {myColors} from '../../utils/Theme';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const StoryLine = ({title, initialLines, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        numberOfLines={isExpanded ? undefined : initialLines}
        style={styles.text}>
        {children}
      </Text>
      {!isExpanded && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.moreButton}>
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: myColors.PRIMARY_DARK_COLOR,
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: myColors.TEXT_WHITE_COLOR,
  },
  text: {
    fontSize: 16,
    color: myColors.TEXT_WHITE_COLOR,
  },
  moreButton: {
    flexDirection: 'row',
  },
  moreText: {
    color: myColors.PRIMARY_BLUE_ACCENT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoryLine;
