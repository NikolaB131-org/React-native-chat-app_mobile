import React, { useState } from 'react';
import { Modal, Pressable, StatusBar, StyleSheet } from 'react-native';
import MyTextInput from './MyTextInput';
import { Colors } from '../core/constants/colors';
import MyText from './MyText';

const BORDER_RADIUS = 12;
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.3)';

type Props = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  initialValue: string;
  onConfirm: (value: string) => void;
};

function TextInputModal({ isVisible, setIsVisible, initialValue, onConfirm }: Props) {
  const [inputValue, setInputValue] = useState(initialValue);

  const onConfirmPressed = () => {
    onConfirm(inputValue);
    setIsVisible(false);
  };

  return (
    <Modal transparent visible={isVisible}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} />
      <Pressable style={styles.wrapper} onPress={() => setIsVisible(false)}>
        <Pressable style={styles.container}>
          <MyTextInput style={styles.textInput} value={inputValue} onChangeText={setInputValue} autoFocus />
          <Pressable style={styles.button} onPress={onConfirmPressed}>
            <MyText style={styles.buttonText}>Confirm</MyText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    width: 300,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  textInput: {
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: BORDER_RADIUS,
    borderColor: Colors.primary,
    borderWidth: 2,
    fontSize: 16,
  },
  button: {
    height: 60,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.secondaryText,
  },
});

export default TextInputModal;
