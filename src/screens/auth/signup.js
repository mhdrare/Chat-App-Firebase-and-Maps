import React, {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native'
import firebase from 'firebase'

const LATITUDE = 0;
const LONGITUDE = 0;

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1',
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			errMessage: '',
			errName: '',
			errEmail: '',
			errPassword: '',
			loading: false,
			location: {
				latitude: 0,
				longitude: 0
			}
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					location: {
				  		latitude: position.coords.latitude,
				  		longitude: position.coords.longitude,
				  	}
				})
			}, (error) => console.warn(error.message),
			{
				enableHighAccuracy:true,
				timeout: 30000,
				maximumAge: 1000
			}
		)
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				this.setState({
					location: {
				  		latitude: position.coords.latitude,
				  		longitude: position.coords.longitude,
				  	}
				})
			}
		)
	}

	changeName = (value) => {
		this.setState({
			name: value,
			errName: ''
		})
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

	changeConfirmPassword = (value) => {
		this.setState({
			confirmPassword: value,
		})
	}

	changeImage = (value) => {
		this.setState({
			image: value,
		})
	}

	registerHandler = () => {
		this.setState({errMessage: '', loading: true});
        
        const{email, password} = this.state;
        
		if (this.state.name == '') {
			this.setState({errName: 'Fill your name!'})
		} else if (this.state.email.length < 6) {
			this.setState({errEmail: 'Email is not valid'})
		} else if (this.state.password.length < 6) {
			this.setState({errPassword: 'Password too short'})
		} else if (this.state.password !== this.state.confirmPassword) {
			this.setState({errPassword: 'Password not match'})
		} else {
			firebase.auth().createUserWithEmailAndPassword(email, password)
	        .then(async (result) => {
	            await this.setState({errMessage: '', loading: false});
	            await firebase.database().ref('users/'+ result.user.uid)
	            	.set({
	            		name: this.state.name, 
	            		email: this.state.email,
	            		profile: this.state.image, 
	            		location: {
	            			latitude: this.state.location.latitude,
	  						longitude: this.state.location.longitude
	            		},

	            	})
	            this.props.navigation.navigate('Home');
	        })
	        .catch(() => {
	            alert('Register failed!')
	        })
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID)
	}

	render(){
		return(
			<React.Fragment>
				<View style={text.center}>
					<Image style={image.icon} source={require('../../assets/images/signup.png')}/>
					<View style={text.viewInput}>
						<TextInput 
							style={text.textInput} 
							placeholder="Full Name"
							onChangeText={this.changeName}/>
					</View>
					{this.state.errName == '' ? <View/> : <Text style={text.validate}>{this.state.errName}</Text>}
					<View style={text.viewInput}>
						<TextInput
							keyboardType={'email-address'}
							style={text.textInput} 
							placeholder="Email"
							onChangeText={this.changeEmail}/>
					</View>
					{this.state.errEmail == '' ? <View/> : <Text style={text.validate}>{this.state.errEmail}</Text>}
					<View style={text.viewInput}>
						<TextInput
							style={text.textInput} 
							placeholder="Image URL"
							onChangeText={this.changeImage}/>
						<Image style={{resizeMode: 'contain', width: 50, flex: 1, borderRadius: 300}} source={{uri: this.state.image}} />
					</View>
					<View style={text.viewInput}>
						<TextInput
							secureTextEntry={true}
							style={text.textInput} 
							placeholder="Password"
							onChangeText={this.changePassword}/>
					</View>
					{this.state.errPassword == '' ? <View/> : <Text style={text.validate}>{this.state.errPassword}</Text>}
					<View style={text.viewInput}>
						<TextInput
							secureTextEntry={true}
							style={text.textInput} 
							placeholder="Confirm Password"
							onChangeText={this.changeConfirmPassword}/>
					</View>
					<TouchableOpacity style={text.signup} onPress={this.registerHandler}>
						{ this.state.loading ? <ActivityIndicator size="large" color="#ffffff"/> : <Text style={{color: 'white', fontWeight: '500'}}>Sign Up</Text> }
					</TouchableOpacity>
					<View style={text.bottom}>
						<Text>
							Already have an account? 
							<Text style={text.link} onPress={()=>this.props.navigation.navigate('LogIn')}> Log In</Text>
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
	signup: {
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
		flex: 2
	},
	viewInput: {
		width: '70%',
		paddingBottom: 10,
		flexDirection: 'row'
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
		height: 150,
	}
})