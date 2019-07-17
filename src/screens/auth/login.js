import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import firebase from 'firebase';
import User from '../../../User';

export default class App extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			email: '',
			password: '',
			errEmail: '',
			errPassword: '',
		};
	}

	changeEmail = (value) => {
		this.setState({
			email: value,
			errEmail: ''
		})
	}

	changePassword = (value) => {
		this.setState({
			password: value,
			errPassword: ''
		})
	}

	loginHandler = () => {
		this.setState({error:'', loading:true});
	    const{email, password} = this.state;
        
		if (this.state.email.length < 6) {
			this.setState({errEmail: 'Email is not valid'})
		} else if (this.state.password.length < 6) {
			this.setState({errPassword: 'Password too short'})
		} else {
	        firebase.auth().signInWithEmailAndPassword(email, password)
	        .then( async (result) => {
	        	User.email = this.state.email;
	            await this.setState({error:'', loading:false});
	            this.props.navigation.navigate('Home');
	        })
	        .catch(() => {
	            this.setState({error:'Authentication Failed', loading:false});
	        })
		}

	}

	render(){
		return(
			<React.Fragment>
				<View style={text.center}>
					<Image style={image.icon} source={require('../../assets/images/login.png')}/>
					<View style={text.viewInput}>
						<TextInput style={text.textInput} placeholder="Email" onChangeText={this.changeEmail} keyboardType={'email-address'}/>
					</View>
					{this.state.errEmail == '' ? <View/> : <Text style={text.validate}>{this.state.errEmail}</Text>}
					<View style={text.viewInput}>
						<TextInput secureTextEntry={true} style={text.textInput} placeholder="Password" onChangeText={this.changePassword}/>
					</View>
					{this.state.errPassword == '' ? <View/> : <Text style={text.validate}>{this.state.errPassword}</Text>}
					<TouchableOpacity style={text.login} onPress={this.loginHandler}>
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
		paddingLeft: 20,
	},
	viewInput: {
		width: '70%',
		paddingBottom: 10,
	},
	validate: {
		width: '70%',
		paddingBottom: 10,
		paddingLeft: 20,
		fontSize: 10,
		color: 'red'
	}
})

const image = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		height: 200,
	}
})