import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors } from '../constants/colors';

type Props = {
  style?: TextProps['style'];
  children?: TextProps['children'];
  numberOfLines?: TextProps['numberOfLines'];
};

function MyText({ style, children, numberOfLines }: Props) {
  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.primaryText,
  },
});

export default MyText;
