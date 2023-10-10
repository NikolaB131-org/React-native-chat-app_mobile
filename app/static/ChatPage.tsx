import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import EditSvg from '../assets/edit.svg';
import LeaveSvg from '../assets/leave.svg';
import DeleteSvg from '../assets/delete.svg';
import MyTextInput from '../shared/MyTextInput';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useAppDispatch } from '../core/redux/hooks';
import { useSelector } from 'react-redux';
import {
  chatsChatsSelector,
  chatsCurrentChatNameSelector,
  chatsErrorMessageSelector,
  chatsStatusSelector,
} from '../core/chats/selectors';
import { ChatType } from '../../../backend/src/modules/chats/chats.model';
import { sendMessage } from '../core/websocket/reducer';
import Message from '../shared/Message';
import SendSvg from '../assets/send.svg';
import { Colors } from '../core/constants/colors';
import { Sizes } from '../core/constants/sizes';
import { deleteChat, leave, updateName } from '../core/chats/thunks';
import { setCurrentChatName, setStatus } from '../core/chats/reducer';
import TextInputModal from '../shared/TextInputModal';

const ItemsSeparator = () => <View style={styles.itemsSeparator} />;

type Props = StackScreenProps<RootStackParamList, 'Chat'>;

function ChatPage({ navigation, route }: Props) {
  const { chatId, chatName } = route.params;

  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const status = useSelector(chatsStatusSelector);
  const errorMessage = useSelector(chatsErrorMessageSelector);
  const currentChatName = useSelector(chatsCurrentChatNameSelector);

  const [chatData, setChatData] = useState<ChatType | null>(null);
  const [messageInputValue, setMessageInputValue] = useState('');
  const [isTextInputModalVisible, setIsTextInputModalVisible] = useState(false);

  const onLeaveButtonPress = async () => {
    await dispatch(leave(chatId));
    navigation.goBack();
  };

  const onDeleteButtonPress = async () => {
    await dispatch(deleteChat(chatId));
    navigation.goBack();
  };

  const getHeaderRight = () => {
    const styles = StyleSheet.create({
      container: { flexDirection: 'row', paddingRight: 4 },
      button: { paddingHorizontal: 12 },
    });

    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => setIsTextInputModalVisible(true)}>
          <EditSvg width={22} height="100%" />
        </Pressable>
        <Pressable style={styles.button} onPress={onLeaveButtonPress}>
          <LeaveSvg width={26} height="100%" />
        </Pressable>
        <Pressable style={styles.button} onPress={onDeleteButtonPress}>
          <DeleteSvg width={26} height="100%" />
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({ headerRight: getHeaderRight });
    dispatch(setCurrentChatName(chatName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: currentChatName }); // for updating header title
  }, [navigation, currentChatName]);

  useEffect(() => {
    const data = chats?.find(chat => chat.id === chatId);
    if (data) {
      setChatData(data);
    }
  }, [chats, chatId, chatData]);

  useEffect(() => {
    if (status === 'failed') {
      Alert.alert('Error', errorMessage);
      dispatch(setStatus('idle'));
    }
  }, [dispatch, status, errorMessage]);

  const onSendPress = () => {
    setMessageInputValue('');
    dispatch(sendMessage({ chatId, message: messageInputValue }));
  };

  const onHeaderTitleChange = async (title: string) => {
    dispatch(updateName({ chatId, name: title }));
  };

  return (
    <>
      <TextInputModal
        isVisible={isTextInputModalVisible}
        setIsVisible={setIsTextInputModalVisible}
        initialValue={chatName}
        onConfirm={onHeaderTitleChange}
      />
      <View style={styles.container}>
        {chatData && (
          <FlatList
            contentContainerStyle={styles.list}
            inverted
            data={[...chatData.messages].reverse()} // we need to reverse data because of prop inverted
            renderItem={({ item }) => <Message {...item} />}
            ItemSeparatorComponent={ItemsSeparator}
          />
        )}
        <View style={styles.footerContainer}>
          <MyTextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={setMessageInputValue}
            value={messageInputValue}
          />
          <Pressable style={styles.sendButtonContainer} onPress={onSendPress}>
            <SendSvg width={34} height={34} stroke={Colors.secondary} />
          </Pressable>
        </View>
      </View>
    </>
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
