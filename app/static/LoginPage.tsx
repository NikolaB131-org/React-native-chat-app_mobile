import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import MyText from '../shared/MyText';
import { Colors } from '../constants/colors';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

function LoginPage({ navigation }: Props) {
  const [inputValue, setInputValue] = React.useState('');

  const onButtonPress = async () => {
    navigation.push('Chats');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          style={[styles.inputAndButton, styles.input]}
          placeholder="Username"
          onChangeText={setInputValue}
          value={inputValue}
        />
        <Pressable style={[styles.inputAndButton, styles.button]} onPress={onButtonPress}>
          <MyText style={styles.buttonText}>Login</MyText>
        </Pressable>
        <MyText style={styles.hintText}>If you are not registered, your account will be created automatically.</MyText>
      </View>
    </View>
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
    color: Colors.text,
  },
  hintText: {
    paddingHorizontal: 10,
    fontSize: 11,
    textAlign: 'center',
    color: Colors.grey,
  },
});

export default LoginPage;
