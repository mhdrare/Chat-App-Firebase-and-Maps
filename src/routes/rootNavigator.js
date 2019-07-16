import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Log from '../screens/auth/index'
import SignUp from '../screens/auth/signup'
import LogIn from '../screens/auth/login'
import Home from '../screens/LandingPage'

const AppStackNavigator = createStackNavigator({
    Log,
    SignUp,
    LogIn,
    Home
}, {
    initialRouteName: 'Log',
    headerMode: 'none'
})

const AppNavigator = createAppContainer(AppStackNavigator);
  
export default AppNavigator;