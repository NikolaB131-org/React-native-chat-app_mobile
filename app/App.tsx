import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from './constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import ChatsPage from './static/ChatsPage';
import SearchSvg from './assets/search.svg';
import LoginPage from './static/LoginPage';

export type RootStackParamList = {
  Login: undefined;
  Chats: undefined;
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackground: getHeaderBackground,
          headerTintColor: Colors.text,
          headerTitleAlign: 'center',
          headerRight: getSearchButton,
          cardStyle: { backgroundColor: '#FFF' },
        }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Chats" component={ChatsPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
