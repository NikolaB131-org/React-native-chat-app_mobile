import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import ChatPreview, { ItemsSeparator } from '../shared/ChatPreview';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { chatsChatsSelector, chatsStatusSelector } from '../core/chats/selectors';
import { useAppDispatch } from '../core/redux/hooks';
import { authUserIdSelector } from '../core/auth/selectors';
import LeaveSvg from '../assets/leave.svg';
import SearchSvg from '../assets/search.svg';
import PlusInCircleSvg from '../assets/plus_in_circle.svg';
import { logout } from '../core/auth/thunks';
import { connect } from '../core/websockets/reducer';
import Config from 'react-native-config';
import { Sizes } from '../core/constants/sizes';
import TextInputModal from '../shared/TextInputModal';
import { create } from '../core/chats/thunks';
import { setCurrentChatName } from '../core/chats/reducer';
import Spinner from '../shared/Spinner';

type Props = StackScreenProps<RootStackParamList, 'Chats'>;

function ChatsPage({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chats = useSelector(chatsChatsSelector);
  const status = useSelector(chatsStatusSelector);
  const userId = useSelector(authUserIdSelector);

  const [isAddChatModalVisible, setIsAddChatModalVisible] = useState(false);

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

  const onChatPreviewPress = (id: string, name: string) => {
    navigation.push('Chat', { chatId: id });
    dispatch(setCurrentChatName(name));
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      {status === 'loading' ? (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          data={chats}
          ItemSeparatorComponent={ItemsSeparator}
          renderItem={({ item }) => (
            <ChatPreview
              imageUrl={item.imageUrl}
              name={item.name}
              messages={item.messages}
              onPress={() => onChatPreviewPress(item.id, item.name)}
            />
          )}
        />
      )}
      <TextInputModal
        titleText="Enter the chat name"
        initialValue=""
        placeholder="Lorem ipsum :)"
        isVisible={isAddChatModalVisible}
        setIsVisible={setIsAddChatModalVisible}
        onConfirm={value => dispatch(create(value))}
      />
      <PlusInCircleSvg
        style={styles.plusButton}
        width={62}
        height={62}
        onPress={() => setIsAddChatModalVisible(true)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.paddingHorizontal,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: 'center',
  },
});

export default ChatsPage;
