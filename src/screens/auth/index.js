import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'

export default class App extends Component {
	componentDidMount(){
		StatusBar.setHidden(true)
	}

	render(){
		return(
			<React.Fragment>
				<StatusBar 
					translucent
					barStyle="dark-content"
					backgroundColor="rgba(0,0,0,0)"
				/>
				<View style={text.center}>
					<Image style={image.icon} source={require('../../assets/images/connected.png')}/>
				</View>
				<Text style={text.title}>Connect with everyone!</Text>
				<View style={text.center}>
					<TouchableOpacity style={text.signup} onPress={()=>this.props.navigation.navigate('SignUp')}>
						<Text style={{color: 'white', fontWeight: '500'}}>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={text.login} onPress={()=>this.props.navigation.navigate('LogIn')}>
						<Text style={{color: '#5ba4e5', fontWeight: '500'}}>Log In</Text>
					</TouchableOpacity>
				</View>
			</React.Fragment>
		)
	}
}

const text = StyleSheet.create({
	center: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	input: {
		margin: 10
	},
	title: {
		fontSize: 20,
		fontFamily: 'sans-serif-thin',
		width: '100%',
		textAlign: 'center',
		paddingBottom: 80
	},
	signup: {
		backgroundColor: '#5ba4e5',
		width: '70%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3
	},
	login: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#5ba4e5',
		width: '70%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3
	}
})

const image = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		width: '80%',
	}
})