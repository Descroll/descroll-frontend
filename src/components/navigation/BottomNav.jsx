import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const bottomTabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Create: CreateScreen,
    Profile: ProfileScreen,
},
{
    initalRouteName: 'Home'
}
);