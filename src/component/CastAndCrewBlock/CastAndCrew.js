import React from 'react';
import {myColors} from '../../utils/Theme';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';

const CastAndCrew = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Актерский состав</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CastAndCrew;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
    height: 76,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: myColors.TEXT_WHITE_COLOR,
  },
  card: {
    flexDirection: 'row',
    marginRight: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColors.TEXT_WHITE_COLOR,
  },
  role: {
    fontSize: 12,
    color: myColors.TEXT_GREY_COLOR,
  },
});
