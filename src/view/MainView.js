import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import CreateCVScreen from './CreateCVScreen';
import JobDetail from './JobDetail'

const Tab = createBottomTabNavigator();

const MainView = () => {

    return(
        <>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home';
                        } else if (route.name === 'List of CV') {
                            iconName = focused ? 'document-text-outline' : 'document-text-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="List of CV" component={CreateCVScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
        </>
        
    )
}

export default MainView