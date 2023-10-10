import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import ChatPreview, { ItemsSeparator } from '../shared/ChatPreview';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { chatsChatsSelector } from '../core/chats/selectors';
import { useAppDispatch } from '../core/redux/hooks';
import { authUserIdSelector } from '../core/auth/selectors';
import LeaveSvg from '../assets/leave.svg';
import SearchSvg from '../assets/search.svg';
import { logout } from '../core/auth/thunks';
import { connect } from '../core/websocket/reducer';
import Config from 'react-native-config';
import { Sizes } from '../core/constants/sizes';

type Props = StackScreenProps<RootStackParamList, 'Chats'>;

function ChatsPage({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const userId = useSelector(authUserIdSelector);

  const getHeaderLeft = () => {
    const styles = StyleSheet.create({
      button: { paddingHorizontal: 20 },
    });

    return (
      <Pressable onPress={() => dispatch(logout())} style={styles.button}>
        <LeaveSvg width={26} height="100%" transform={[{ rotateY: '180deg' }]} />
      </Pressable>
    );
  };

  const getHeaderRight = () => {
    const styles = StyleSheet.create({
      button: { paddingHorizontal: 20 },
    });

    return (
      <Pressable onPress={() => navigation.push('Search')} style={styles.button}>
        <SearchSvg width={22} height="100%" />
      </Pressable>
    );
  };

  useEffect(() => {
    navigation.setOptions({ headerLeft: getHeaderLeft, headerRight: getHeaderRight });
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
  container: { padding: Sizes.paddingHorizontal },
});

export default ChatsPage;
