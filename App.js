import Navigation from './Apps/Screens/Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import React, { createContext, useEffect, useState, } from 'react';
import { View,  Text, ActivityIndicator } from 'react-native';
export const ReloadMethodsContext = createContext();
export const openDbContext = createContext();
import Connection from './Apps/DB/Connection';
import {SQLiteProvider} from 'expo-sqlite/next';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
 
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Regular':require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium':require('./assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold':require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-SemiBold':require('./assets/fonts/Outfit-SemiBold.ttf')
  });

  const [reload, setReload] = useState();
  
  const [dbLoaded, setDbLoaded] = useState(false);
  useEffect(()=>{
     Connection.loadDatabase().then(
        () => {
          setDbLoaded(true);
        }
      ).catch((e)=>{console.error(e)})
  }, []);
  if(!dbLoaded) {
    return(
      <View>
        <ActivityIndicator size={"large"}/>
        <Text>Loading...</Text>
      </View>
    );
  }
     return(
     
    <React.Suspense
    fallback={
      <View style={{flex: 1}}>
        <ActivityIndicator size={"large"}/>
        <Text>Loading...</Text>
      </View>
    }>
       <SQLiteProvider 
      databaseName="MobileSQLite.db"
      useSuspense={true}>
      <ReloadMethodsContext.Provider value={{reload, setReload}}>
     <NavigationContainer>
            <Navigation />
     </NavigationContainer>
     </ReloadMethodsContext.Provider>
     </SQLiteProvider>
    </React.Suspense>
     
     );
}


