import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import AuthContext from './AuthContext';

import Login from './src/view/Login';
import Signup from './src/view/Signup';
import MainView from './src/view/MainView';
import UpdateInfoScreen from './src/view/UpdateInfoScreen';
import JobDetail from './src/view/JobDetail';
import EditInfoScreen from './src/view/EditInfoScreen';
import SetInfoScreen from './src/view/SetInfoScreen';
import CreateCV from './src/view/CreateCV';


import { configureStore } from '@reduxjs/toolkit'
import userIdReducer from './src/redux/reducers/userIdReducers';


import { Provider } from 'react-redux';
// import { store } from './src/redux/store'
import store from './src/redux/store'

// const store = configureStore({
//   reducer: {
//       "userId": userIdReducer
//   }
// })

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    // <Provider store={store.getState().userId}>
    <Provider store={store}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
              <Stack.Navigator screenListeners={{headerShown: false,}}>
                {state.isLoading ? (
                  // We haven't finished checking for the token yet
                  <Stack.Screen name="Splash" component={SplashScreen} />
                ) : state.userToken == null ? (
                  // No token found, user isn't signed in
                  <>
                    <Stack.Screen
                      name="SignIn"
                      component={Login}
                      options={{
                        title: 'Sign in',
                        // When logging out, a pop animation feels intuitive
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                        headerShown: false
                      }}
                    />
                    <Stack.Screen
                      name="Signup"
                      component={Signup}
                      options={{
                        title: 'Sign up',
                        // When logging out, a pop animation feels intuitive
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                        headerShown: false
                      }}
                    />
                  </>
                  
                ) : (
                  // User is signed in
                  <>
                    <Stack.Screen name="MainView" component={MainView} options={{headerShown: false}}/>
                    <Stack.Screen name="UpdateInfoScreen" component={UpdateInfoScreen} />
                    <Stack.Screen name="Job Detail" component={JobDetail} />
                    <Stack.Screen name="Edit Personal Information" component={EditInfoScreen} />
                    <Stack.Screen name="Set Personal Information" component={SetInfoScreen} />
                    <Stack.Screen name="Create CV" component={CreateCV} />
                  </>
                  
                )}
              </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    // {/* </React.Fragment> */}

    
    
  );
}