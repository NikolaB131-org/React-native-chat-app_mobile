import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './core/redux/store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, StyleSheet } from 'react-native';
import LoginPage from './static/LoginPage';
import ChatsPage from './static/ChatsPage';
import ChatPage from './static/ChatPage';
import { Colors } from './core/constants/colors';
import Keychain from 'react-native-keychain';
import { useAppDispatch } from './core/redux/hooks';
import { setUserId } from './core/auth/reducer';
import { authUserIdSelector } from './core/auth/selectors';
import SearchPage from './static/SearchPage';

export type RootStackParamList = {
  Login: undefined;
  Chats: undefined;
  Chat: { chatId: string };
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function HeaderBackground() {
  const styles = StyleSheet.create({ linearGradient: { flex: 1 } });

  return (
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
}

function App() {
  const dispatch = useAppDispatch();
  const userId = useSelector(authUserIdSelector);

  useEffect(() => {
    const getCredentials = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.username) {
        dispatch(setUserId(credentials.username));
        console.log('Credentials successfully restored');
      }
    };
    getCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackground: HeaderBackground,
          headerTintColor: Colors.secondaryText,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#FFF' },
        }}>
        {userId ? (
          <>
            <Stack.Screen name="Chats" component={ChatsPage} />
            <Stack.Screen name="Chat" component={ChatPage} />
            <Stack.Screen name="Search" component={SearchPage} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ animationTypeForReplace: userId ? 'push' : 'pop' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
