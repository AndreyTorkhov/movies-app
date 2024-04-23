import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {AuthContext} from '../context';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

export function StackMenu() {
  const {isAuth} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
