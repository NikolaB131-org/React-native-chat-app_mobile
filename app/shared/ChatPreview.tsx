import React from 'react';
import { MessageType } from '../../../backend/src/modules/message/message.model';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import ChatDefaultSvg from '../assets/chat_default.svg';
import PlusSvg from '../assets/plus.svg';
import MyText from './MyText';
import { getMessageDate } from '../core/utils/getMessageDate';
import { Colors } from '../core/constants/colors';

const IMAGE_WIDTH = 55;
const IMAGE_MARGIN_RIGHT = 16;

export const getChatPreviewImageContainerWidth = () => IMAGE_WIDTH + IMAGE_MARGIN_RIGHT;

type Props = {
  imageUrl?: string;
  name: string;
  messages?: MessageType[];
  usersNum?: number;
  onPress?: () => void;
  onPlusPress?: () => void;
};

function ChatPreview({ imageUrl, name, messages, usersNum, onPress, onPlusPress }: Props) {
  const lastMessage = messages?.at(-1);
  const lastMessageText = lastMessage?.message;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {imageUrl ? (
        <Image style={styles.image} source={{ uri: imageUrl }} width={IMAGE_WIDTH} height={IMAGE_WIDTH} />
      ) : (
        <ChatDefaultSvg style={styles.image} width={IMAGE_WIDTH} height={IMAGE_WIDTH} />
      )}
      <View style={styles.nameMessageTimeContainer}>
        <View style={styles.nameMessageContainer}>
          <MyText style={styles.name}>{name}</MyText>
          <MyText style={styles.lastMessage} numberOfLines={1}>
            {lastMessageText ? lastMessageText : usersNum !== undefined ? `Users in chat: ${usersNum}` : ''}
          </MyText>
        </View>
        {onPlusPress && (
          <PlusSvg style={styles.plusButton} width={30} height={30} fill={Colors.primary} onPress={onPlusPress} />
        )}
        {lastMessage && <MyText style={styles.date}>{getMessageDate(new Date(lastMessage.createdAt))}</MyText>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: IMAGE_MARGIN_RIGHT,
    borderRadius: 1000,
  },
  nameMessageTimeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  nameMessageContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  lastMessage: {
    color: Colors.grey,
    fontSize: 15,
  },
  plusButton: {
    alignSelf: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },
  date: {
    color: Colors.grey,
    fontSize: 12,
  },
});

function ItemsSeparator() {
  const stylesItemsSeparator = StyleSheet.create({
    container: {
      height: 1,
      backgroundColor: Colors.lightGrey,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: getChatPreviewImageContainerWidth(),
    },
  });

  return <View style={stylesItemsSeparator.container} />;
}

export default ChatPreview;
export { ItemsSeparator };
