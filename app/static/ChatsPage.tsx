import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatPreview, { getChatPreviewImageContainerWidth } from '../shared/ChatPreview';
import { Colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { chatsChatsSelector } from '../core/chats/selectors';
import { useAppDispatch } from '../core/redux/hooks';
import Config from 'react-native-config';
import { authUserIdSelector } from '../core/auth/selectors';
import websockets from '../core/websockets';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Sizes } from '../constants/sizes';

const ItemsSeparator = () => <View style={styles.itemsSeparator} />;

type Props = StackScreenProps<RootStackParamList, 'Chats'>;

function ChatsPage({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const userId = useSelector(authUserIdSelector);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    if (userId && Config.API_URL_WS) {
      console.log('RERENDER2');
      const ws = new WebSocket(Config.API_URL_WS);
      websockets.start(ws, dispatch, userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChatPreviewPress = (id: string) => {
    navigation.push('Chat', { chatId: id });
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={chats}
      ItemSeparatorComponent={ItemsSeparator}
      renderItem={({ item }) => (
        <ChatPreview
          imageUrl={item.imageUrl}
          name={item.name}
          messages={item.messages}
          onPress={() => onChatPreviewPress(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.paddingHorizontal,
  },
  itemsSeparator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: getChatPreviewImageContainerWidth(),
  },
});

export default ChatsPage;
