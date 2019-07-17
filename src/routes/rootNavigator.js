import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Log from '../screens/auth/index'
import SignUp from '../screens/auth/signup'
import LogIn from '../screens/auth/login'
import Home from '../screens/LandingPage'
import Checker from '../screens/Checker'
import Chat from '../screens/chat/index'
import DrawerNavigator from '../components/DrawerNavigator'

const AuthNavigator = createStackNavigator({
    Log,
    SignUp,
    LogIn,
}, {
    initialRouteName: 'Log',
    headerMode: 'none'
})

const HomeNavigator = createStackNavigator({
	Home,
	Chat
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
})

const AppDrawer = createDrawerNavigator({
	Home: HomeNavigator
}, {
	contentComponent: DrawerNavigator
})

const SwitchNavigator = createSwitchNavigator({
	Auth: AuthNavigator,
	Checker: Checker,
	Home: AppDrawer
},{
    initialRouteName: 'Checker',
})

export default createAppContainer(SwitchNavigator);