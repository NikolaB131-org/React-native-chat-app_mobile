import React, { useState } from 'react';
import { Modal, Pressable, StatusBar, StyleSheet } from 'react-native';
import MyTextInput from './MyTextInput';
import { Colors } from '../core/constants/colors';
import MyText from './MyText';

const BORDER_RADIUS = 12;
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.3)';

type Props = {
  titleText?: string;
  initialValue?: string;
  placeholder?: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  onConfirm: (value: string) => void;
};

function TextInputModal({ titleText, initialValue = '', placeholder, isVisible, setIsVisible, onConfirm }: Props) {
  const [inputValue, setInputValue] = useState(initialValue);

  const onConfirmPressed = () => {
    onConfirm(inputValue);
    setIsVisible(false);
    setInputValue(initialValue);
  };

  return (
    <Modal transparent visible={isVisible}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} />
      <Pressable style={styles.wrapper} onPress={() => setIsVisible(false)}>
        <Pressable style={styles.container}>
          {titleText && <MyText style={styles.titleText}>{titleText}</MyText>}
          <MyTextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
            placeholder={placeholder}
          />
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
    backgroundColor: '#FFF',
    gap: 15,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    paddingHorizontal: 15,
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
