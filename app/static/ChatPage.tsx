import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import MyTextInput from '../shared/MyTextInput';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useAppDispatch } from '../core/redux/hooks';
import { useSelector } from 'react-redux';
import { chatsChatsSelector } from '../core/chats/selectors';
import { ChatType } from '../../../backend/src/modules/chats/chats.model';
import { sendMessage } from '../core/websocket/reducer';
import Message from '../shared/Message';
import SendSvg from '../assets/send.svg';
import { Colors } from '../core/constants/colors';
import { Sizes } from '../core/constants/sizes';

const ItemsSeparator = () => <View style={styles.itemsSeparator} />;

type Props = StackScreenProps<RootStackParamList, 'Chat'>;

function ChatPage({ route }: Props) {
  const { chatId } = route.params;

  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const [chatData, setChatData] = useState<ChatType | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const data = chats?.find(chat => chat.id === chatId);
    if (data) {
      setChatData(data);
    }
  }, [chats, chatId, chatData]);

  const onSendPress = () => {
    setInputValue('');
    dispatch(sendMessage({ chatId, message: inputValue }));
  };

  return (
    <View style={styles.container}>
      {chatData && (
        <FlatList
          contentContainerStyle={styles.list}
          inverted
          data={[...chatData.messages].reverse()}
          renderItem={({ item }) => <Message {...item} />}
          ItemSeparatorComponent={ItemsSeparator}
        />
      )}
      <View style={styles.footerContainer}>
        <MyTextInput
          style={styles.input}
          placeholder="Type something..."
          onChangeText={setInputValue}
          value={inputValue}
        />
        <Pressable style={styles.sendButtonContainer} onPress={onSendPress}>
          <SendSvg width={34} height={34} stroke={Colors.secondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: Sizes.paddingHorizontal,
  },
  itemsSeparator: {
    height: 10,
  },
  footerContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Sizes.paddingHorizontal,
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButtonContainer: {
    padding: Sizes.paddingHorizontal,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default ChatPage;
