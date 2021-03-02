import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from "react-native";

const CustomButton = ({ onPress, color, width, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, { backgroundColor: color, width: width ? `${width}%` : 'auto' }]}
      onLongPress={ () => alert('You long-pressed the button!')}
    >
      <Text style={styles.whiteText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
  },
  whiteText: {
    color: '#ffffff',
  }
});


export default CustomButton;
