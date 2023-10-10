import React from 'react';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import SearchSvg from './assets/search.svg';
import LoginPage from './static/LoginPage';
import ChatsPage from './static/ChatsPage';
import ChatPage from './static/ChatPage';
import { Colors } from './constants/colors';

export type RootStackParamList = {
  Login: undefined;
  Chats: undefined;
  Chat: { chatId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const getHeaderBackground = () => (
  <>
    <LinearGradient
      style={styles.linearGradient}
      colors={[Colors.primary, Colors.secondary]}
      useAngle={true}
      angle={30}
    />
    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
  </>
);

const getSearchButton = () => (
  <Pressable onPress={() => console.log(1233)} style={styles.searchButton}>
    <SearchSvg width={22} height="100%" />
  </Pressable>
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackground: getHeaderBackground,
            headerTintColor: Colors.secondaryText,
            headerTitleAlign: 'center',
            cardStyle: { backgroundColor: '#FFF' },
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Chats" component={ChatsPage} options={{ headerRight: getSearchButton }} />
          <Stack.Screen name="Chat" component={ChatPage} options={{ headerRight: undefined }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  searchButton: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default App;
