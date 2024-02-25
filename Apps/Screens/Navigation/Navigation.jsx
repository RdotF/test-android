import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import LoginScreen from '../LoginScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
   
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="Log In" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
   
  );
}

export default Navigation;