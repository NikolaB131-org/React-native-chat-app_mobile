import React from 'react';
import { MessageType } from '../../../backend/src/modules/message/message.model';
import { prependZero } from '../core/utils/prependZero';
import { GestureResponderEvent, Image, Pressable, StyleSheet, View } from 'react-native';
import ChatDefaultSvg from '../assets/chat_default.svg';
import MyText from './MyText';
import { Colors } from '../constants/colors';

const IMAGE_WIDTH = 55;
const IMAGE_MARGIN_RIGHT = 16;

export const getChatPreviewImageContainerWidth = () => IMAGE_WIDTH + IMAGE_MARGIN_RIGHT;

type Props = {
  imageUrl?: string;
  name: string;
  messages: MessageType[];
  onPress?: ((event: GestureResponderEvent) => void) | null;
};

function ChatPreview({ imageUrl, name, messages, onPress }: Props) {
  const lastMessage = messages.at(-1);
  const lastMessageText: string = lastMessage?.message ?? '';

  const getLastMessageDate = (): string => {
    if (!lastMessage) {
      return '';
    }

    const date = new Date(lastMessage.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const miniutes = date.getMinutes();

    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();

    if (year === yearNow && month === monthNow && day === dayNow) {
      return `${prependZero(hours)}:${prependZero(miniutes)}`;
    }
    return `${prependZero(day)}/${prependZero(month)}/${year}`;
  };

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
            {lastMessageText}
          </MyText>
        </View>
        <MyText style={styles.date}>{getLastMessageDate()}</MyText>
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
  date: {
    color: Colors.grey,
    fontSize: 12,
  },
});

export default ChatPreview;
