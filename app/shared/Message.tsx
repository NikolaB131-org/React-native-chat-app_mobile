import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import MyText from './MyText';
import { MessageType } from '../../../backend/src/modules/message/message.model';
import { useSelector } from 'react-redux';
import { authUserIdSelector } from '../core/auth/selectors';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../core/constants/colors';
import { getMessageDate } from '../core/utils/getMessageDate';

function Message({ message, sender, createdAt }: MessageType) {
  const userId = useSelector(authUserIdSelector);

  const isMyMessage = userId === sender.id;
  const messageDate = getMessageDate(new Date(createdAt), { full: true });

  const alignSelf: ViewStyle['alignSelf'] = isMyMessage ? 'flex-end' : 'flex-start';

  return (
    <View style={[styles.wrapper, { alignSelf }]}>
      {isMyMessage ? (
        <LinearGradient
          style={linearGradientStyles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.primary, Colors.secondary]}>
          <MyText style={linearGradientStyles.text} selectable>
            {message}
          </MyText>
          <MyText style={linearGradientStyles.date} selectable>
            {messageDate}
          </MyText>
        </LinearGradient>
      ) : (
        <View style={styles.container}>
          <MyText style={styles.sender} selectable>
            {sender.username}
          </MyText>
          <MyText selectable>{message}</MyText>
          <MyText style={styles.date} selectable>
            {messageDate}
          </MyText>
        </View>
      )}
    </View>
  );
}

const PADDING = 10;
const BORDER_RADIUS = 14;
const DATE_FONT_SIZE = 12;
const GRADIENT_TEXT_COLOR = Colors.secondaryText;

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 150,
    flexShrink: 1,
  },
  container: {
    padding: PADDING,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: '#f3f3f3',
  },
  sender: {
    fontWeight: '600',
  },
  date: {
    fontSize: DATE_FONT_SIZE,
    alignSelf: 'flex-end',
    color: Colors.grey,
  },
});

const linearGradientStyles = StyleSheet.create({
  container: {
    padding: PADDING,
    borderRadius: BORDER_RADIUS,
  },
  text: {
    color: GRADIENT_TEXT_COLOR,
  },
  date: {
    fontSize: DATE_FONT_SIZE,
    alignSelf: 'flex-end',
    color: GRADIENT_TEXT_COLOR,
  },
});

export default Message;
