
import Navigation from './Apps/Screens/Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { createContext, useState } from 'react';
import { View } from 'react-native';
export const ReloadMethodsContext = createContext();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Regular':require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium':require('./assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold':require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-SemiBold':require('./assets/fonts/Outfit-SemiBold.ttf')
  });
  const [reload, setReload] = useState();
     return    (
     <>
      <ReloadMethodsContext.Provider value={{reload, setReload}}>
     <NavigationContainer>
            <Navigation />
     </NavigationContainer>
     </ReloadMethodsContext.Provider>
     </>
     );
}


