import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'

export default class App extends Component {
	render(){
		return(
			<React.Fragment>
				<View style={text.center}>
					<Image style={image.icon} source={require('../../assets/images/login.png')}/>
					<View style={text.viewInput}>
						<TextInput style={text.textInput} placeholder="Username"/>
					</View>
					<View style={text.viewInput}>
						<TextInput style={text.textInput} placeholder="Password"/>
					</View>
					<TouchableOpacity style={text.login} onPress={()=>this.props.navigation.navigate('Home')}>
						<Text style={{color: 'white', fontWeight: '500'}}>Log In</Text>
					</TouchableOpacity>
					<View style={text.bottom}>
						<Text>
							Don't have an account? 
							<Text style={text.link} onPress={()=>this.props.navigation.navigate('SignUp')}> Sign Up</Text>
						</Text>
					</View>
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
	login: {
		backgroundColor: '#5ba4e5',
		width: '70%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3
	},
	bottom: {
		paddingTop: 10
	},
	link: {
		color: '#5ba4e5'
	},
	textInput: {
		backgroundColor: '#f5f5f1',
		padding: 5,
		paddingLeft: 20
	},
	viewInput: {
		width: '70%',
		paddingBottom: 10,
	}
})

const image = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		height: 200,
	}
})