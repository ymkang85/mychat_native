import React, { useState, createContext, useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

import Home from './screens/Home';
import Login from './screens/Login';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext();

const AuthenticatedUserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={signup} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(
      auth, 
      async AuthenticatedUser => {
        AuthenticatedUser ? setUser(AuthenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);
  
  if(isLoading){
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      { user ? <ChatStack />:<AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthenticatedUserContextProvider>
      <RootNavigator />
    </AuthenticatedUserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
