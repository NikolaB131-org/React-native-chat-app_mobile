import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../constants/colors';

type Props = {
  style?: TextInputProps['style'];
  placeholder?: TextInputProps['placeholder'];
  onChangeText?: TextInputProps['onChangeText'];
  value?: TextInputProps['value'];
};

function MyText({ style, placeholder, onChangeText, value }: Props) {
  return (
    <TextInput
      style={[styles.text, style]}
      placeholderTextColor={Colors.lightGrey}
      selectionColor={Colors.primary}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.primaryText,
  },
});

export default MyText;
