import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { chatsSearchedChatsSelector, chatsStatusSelector } from '../core/chats/selectors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ChatPreview, { ItemsSeparator } from '../shared/ChatPreview';
import MyTextInput from '../shared/MyTextInput';
import { useAppDispatch } from '../core/redux/hooks';
import { join, search } from '../core/chats/thunks';
import Spinner from '../shared/Spinner';

function HeaderTitle({ onValueChanged }: { onValueChanged: (value: string) => void }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    onValueChanged(value);
  }, [onValueChanged, value]);

  const styles = StyleSheet.create({
    container: {
      width: 300,
      paddingHorizontal: 12,
      paddingVertical: 5,
      backgroundColor: '#FFF',
      fontSize: 16,
      borderRadius: 10,
    },
  });

  return (
    <MyTextInput value={value} onChangeText={setValue} style={styles.container} placeholder="Something to search..." />
  );
}

type Props = StackScreenProps<RootStackParamList, 'Search'>;

function SearchPage({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const status = useSelector(chatsStatusSelector);
  const searchedChats = useSelector(chatsSearchedChatsSelector);

  useEffect(() => {
    const onInputValuedChanged = (text: string) => dispatch(search(text));
    // eslint-disable-next-line react/no-unstable-nested-components
    navigation.setOptions({ headerTitle: () => <HeaderTitle onValueChanged={onInputValuedChanged} /> });
  }, [navigation, dispatch]);

  const onPlusPress = async (id: string) => {
    await dispatch(join(id));
    navigation.goBack();
  };

  if (status === 'loading') {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  } else {
    return (
      <FlatList
        data={searchedChats}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={ItemsSeparator}
        renderItem={({ item }) => (
          <ChatPreview
            imageUrl={item.imageUrl}
            name={item.name}
            usersNum={item.users.length}
            onPlusPress={() => onPlusPress(item.id)}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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

export default SearchPage;
