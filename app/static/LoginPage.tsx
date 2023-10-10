import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../core/redux/hooks';
import { useSelector } from 'react-redux';
import { authStatusSelector, authErrorMessageSelector } from '../core/auth/selectors';
import { login } from '../core/auth/thunks';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import MyTextInput from '../shared/MyTextInput';
import MyText from '../shared/MyText';
import Spinner from '../shared/Spinner';
import { Colors } from '../core/constants/colors';

function LoginPage() {
  const dispatch = useAppDispatch();
  const authStatus = useSelector(authStatusSelector);
  const authErrorMessage = useSelector(authErrorMessageSelector);

  const [inputValue, setInputValue] = useState('');

  const onButtonPress = async () => {
    if (inputValue.length > 2) {
      dispatch(login({ username: inputValue }));
    } else {
      Alert.alert('Validation error', 'User name must contain at least 3 characters');
    }
  };

  useEffect(() => {
    if (authStatus === 'failed') {
      Alert.alert('Error', authErrorMessage);
    }
  }, [authStatus, authErrorMessage]);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <MyTextInput
            style={[styles.inputAndButton, styles.input]}
            placeholder="Username"
            onChangeText={setInputValue}
            value={inputValue}
          />
          <Pressable style={[styles.inputAndButton, styles.button]} onPress={onButtonPress}>
            <MyText style={styles.buttonText}>Login</MyText>
          </Pressable>
          <MyText style={styles.hintText}>
            If you are not registered, your account will be created automatically.
          </MyText>
        </View>
      </View>
      {authStatus === 'loading' && (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
  },
  inputAndButton: {
    height: 60,
    borderRadius: 12,
  },
  input: {
    paddingLeft: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    fontSize: 16,
  },
  button: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.secondaryText,
  },
  hintText: {
    paddingHorizontal: 10,
    fontSize: 11,
    textAlign: 'center',
    color: Colors.grey,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default LoginPage;
