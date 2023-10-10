import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatPreview, { getChatPreviewImageContainerWidth } from '../shared/ChatPreview';
import { Colors } from '../core/constants/colors';
import { useSelector } from 'react-redux';
import { chatsChatsSelector } from '../core/chats/selectors';
import { useAppDispatch } from '../core/redux/hooks';
import { authUserIdSelector } from '../core/auth/selectors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Sizes } from '../core/constants/sizes';
import { connect } from '../core/websocket/reducer';
import Config from 'react-native-config';

const ItemsSeparator = () => <View style={styles.itemsSeparator} />;

type Props = StackScreenProps<RootStackParamList, 'Chats'>;

function ChatsPage({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const userId = useSelector(authUserIdSelector);

  useEffect(() => {
    if (userId && Config.API_URL_WS) {
      dispatch(connect(Config.API_URL_WS));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onPress={() => navigation.push('Chat', { chatId: item.id, chatName: item.name })}
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
