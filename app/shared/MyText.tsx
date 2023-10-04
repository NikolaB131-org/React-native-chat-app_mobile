import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: object;
  numberOfLines?: number;
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
    color: '#2a2a2a',
  },
});

export default MyText;
