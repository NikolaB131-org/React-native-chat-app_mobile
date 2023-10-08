import React from 'react';
import { GestureResponderEvent, Image, Pressable, StyleSheet, View } from 'react-native';
import MyText from './MyText';
import { Colors } from '../constants/colors';

const IMAGE_WIDTH = 55;
const IMAGE_HEIGHT = IMAGE_WIDTH;
const IMAGE_MARGIN_RIGHT = 16;

export const getChatPreviewImageContainerWidth = () => IMAGE_WIDTH + IMAGE_MARGIN_RIGHT;

export type Props = {
  avatarImageUrl: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
};

function ChatPreview({ avatarImageUrl, name, lastMessage, lastMessageTime, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: avatarImageUrl }}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        borderRadius={1000} // circle
      />
      <View style={styles.nameMessageTimeContainer}>
        <View style={styles.nameMessageContainer}>
          <MyText style={styles.name}>{name}</MyText>
          <MyText style={styles.lastMessage} numberOfLines={1}>
            {lastMessage}
          </MyText>
        </View>
        <MyText style={styles.time}>{lastMessageTime}</MyText>
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
  time: {
    color: Colors.grey,
    fontSize: 12,
  },
});

export default ChatPreview;
