import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TEXT_DARK_GREY_COLOR } from "../constant.js";

export class CheckBox extends Component {
  state = {
    isChecked: false,
  };

  toggleCheckBox = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.checkBox, this.state.isChecked && styles.checked]}
        onPress={this.toggleCheckBox}
      >
        {this.state.isChecked && <View style={styles.checkMark} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: TEXT_DARK_GREY_COLOR,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "transparent",
  },
  checkMark: {
    width: 24,
    height: 24,
    backgroundColor: TEXT_DARK_GREY_COLOR,
    borderRadius: 2,
  },
});
