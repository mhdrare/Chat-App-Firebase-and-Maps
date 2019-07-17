import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native'
import firebase from 'firebase'

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			uid: ''
		};
	}

	componentDidMount(){

		let firebaseConfig = {
			apiKey: "AIzaSyCa5hLNiSIy3av_CVkTHFVbQOsQN-pkOio",
			authDomain: "meme-maps-246903.firebaseapp.com",
			databaseURL: "https://meme-maps-246903.firebaseio.com",
			projectId: "meme-maps-246903",
			storageBucket: "",
			messagingSenderId: "57178564849",
			appId: "1:57178564849:web:b686aea00eadc78b"
		};
		// Initialize Firebase
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		firebase.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? 'Home' : 'Auth')
		})
	}

	render(){
		return(
			<React.Fragment>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color="#5ba4e5" />
				</View>
			</React.Fragment>
		)
	}
}
