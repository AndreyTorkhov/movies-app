import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Моя домашняя страница</Text>

        <Button
          title="To Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
