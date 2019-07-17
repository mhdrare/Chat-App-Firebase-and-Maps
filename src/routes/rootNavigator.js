import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import Log from '../screens/auth/index'
import SignUp from '../screens/auth/signup'
import LogIn from '../screens/auth/login'
import Home from '../screens/LandingPage'
import Loading from '../screens/Loading'
import Chat from '../screens/chat/index'
import Personal from '../screens/chat/personal'
import Profile from '../screens/profile/me'
import FriendsProfile from '../screens/profile/friends'
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
	Chat,
    Personal,
    Profile,
    FriendsProfile
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
	Loading: Loading,
	Home: AppDrawer
},{
    initialRouteName: 'Loading',
})

export default createAppContainer(SwitchNavigator);