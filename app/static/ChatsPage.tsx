import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatPreview, { Props as ChatPreviewProps, getChatPreviewImageContainerWidth } from '../shared/ChatPreview';
import { Colors } from '../constants/colors';

const items: ChatPreviewProps[] = [
  {
    avatarImageUrl:
      'https://get.pxhere.com/photo/water-nature-forest-bridge-sunlight-leaf-suspension-bridge-green-jungle-rope-bridge-habitat-nonbuilding-structure-81677.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'I am fine. What about you?',
    lastMessageTime: '18:10',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Lauren Spencer',
    lastMessage: 'Hey! how are you?',
    lastMessageTime: '15:17',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blala ldlsa dalsd adasld ad234 32424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadals dadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
  {
    avatarImageUrl:
      'https://blog.pshares.org/wp-content/uploads/sites/10/2012/02/dawn-dusk-hd-wallpaper-36717-1536x956.jpg',
    name: 'Eugene Hanson',
    lastMessage: 'Hey! how are you? blalaldlsadalsdadasldad23432424',
    lastMessageTime: '12:59',
  },
];

function ItemsSeparator() {
  return <View style={styles.itemsSeparator} />;
}

function ChatsPage() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={items}
      ItemSeparatorComponent={ItemsSeparator}
      renderItem={({ item }) => (
        <ChatPreview
          avatarImageUrl={item.avatarImageUrl}
          name={item.name}
          lastMessage={item.lastMessage}
          lastMessageTime={item.lastMessageTime}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
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
