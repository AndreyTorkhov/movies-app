import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TEXT_WHITE_COLOR } from "../constant.js";

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Моя домашняя страница</Text>

        <Button
          title="To Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="To Sign Up"
          onPress={() => this.props.navigation.navigate("Sign Up")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TEXT_WHITE_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});
