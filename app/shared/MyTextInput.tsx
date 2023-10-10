import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../core/constants/colors';

type Props = {
  style?: TextInputProps['style'];
  placeholder?: TextInputProps['placeholder'];
  onChangeText?: TextInputProps['onChangeText'];
  value?: TextInputProps['value'];
};

function MyText({ style, placeholder, onChangeText, value }: Props) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={Colors.lightGrey}
      selectionColor={Colors.primary}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: Colors.primaryText,
    padding: 0,
  },
});

export default MyText;
