import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/AntDesign'
import User from '../../User'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentUser: null,
	  	pProfile: '',
	  	uid: '',
	  	email: '',
	  	region: {
	  		latitude: LATITUDE,
	  		longitude: LONGITUDE,
	  		latitudeDelta: LATITUDE_DELTA,
	  		longitudeDelta: LONGITUDE_DELTA
	  	},
	  	users: []
	  };
	}

	async componentWillMount(){
		let user = firebase.auth().currentUser;

		if (user != null) {
			await this.setState({
				email: user.email,
				uid: user.uid
			})
		}

		firebase.database().ref('users').on('child_added', (val) => {
			let person = val.val();
			person.uid = val.key
			if(person.uid === this.state.uid) {
				User.uid = person.uid
				User.email = person.email
				User.name = person.name
				User.profile = person.profile
				User.data = {
					name: person.name,
					profile: person.profile,
					email: person.email
				}
			} else {
				this.setState((prevState)=>{
					return{
						users: [...prevState.users]
					}
				})
			}
		})
	}

	componentDidMount(){
		StatusBar.setHidden(false)
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					region: {
				  		latitude: position.coords.latitude,
				  		longitude: position.coords.longitude,
				  		latitudeDelta: LATITUDE_DELTA,
				  		longitudeDelta: LONGITUDE_DELTA
				  	}
				})
			}, (error) => console.warn(error.message),
			{
				enableHighAccuracy:true,
				timeout: 20000,
				maximumAge: 1000
			}
		)
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				this.setState({
					region: {
				  		latitude: position.coords.latitude,
				  		longitude: position.coords.longitude,
				  		latitudeDelta: LATITUDE_DELTA,
				  		longitudeDelta: LONGITUDE_DELTA
				  	}
				})
			}
		)
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID)
	}

	render(){
		return(
			<React.Fragment>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={{flex: 1}}
					region={this.state.region}
					showsUserLocation={true}>
					<MapView.Marker
			        	coordinate={ this.state.region }
			        />
				</MapView>
				<View style={component.top}></View>
				<View style={component.header}>
					<View style={items.center}>
						<View style={items.left}>
							<TouchableOpacity style={items.listFriends} onPress={() => {this.props.navigation.openDrawer()}}>
								<Text style={{textAlign: 'center', color: '#fff', fontFamily:'sans-serif-medium'}}>Friends</Text>
							</TouchableOpacity>
						</View>
						<View style={items.titleHeader}></View>
						<View style={items.right}>
							<TouchableOpacity style={items.itemsProfil} onPress={()=>this.props.navigation.navigate('Profile')}>
								<Text style={{textAlign: 'left', color: '#fff', fontFamily:'sans-serif-medium'}}>{User.name}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<TouchableOpacity style={component.profile} onPress={()=>this.props.navigation.navigate('Profile')}>
					<Image style={image.profile} source={{uri: User.profile }}/>
				</TouchableOpacity>
				<TouchableOpacity style={component.fab} onPress={()=>this.props.navigation.navigate('Chat')}>
					<Icon name="message1" size={25} color='#5ba4e5'/>
				</TouchableOpacity>
			</React.Fragment>
		)
	}
}

const items = StyleSheet.create({
	title: {
		fontSize: 20,
		fontFamily: 'sans-serif-thin',
		width: '100%',
		textAlign: 'center',
		paddingBottom: 80
	},
	left: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	center: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	right: {
		flex: 3,
		backgroundColor: '#5ba4e5',
		width: '100%',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	titleHeader: {
		color: '#5ba4e5',
		fontSize: 17,
		flex: 5,
		textAlign: 'center',
		fontFamily: 'sans-serif-medium'
	},
	listFriends: {
		width: 100,
		backgroundColor: '#5ba4e5',
		height: 35,
		justifyContent: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	itemsProfil: {
		width: 100,
		height: 35,
		justifyContent: 'center',
		paddingLeft: 5
	}
})

const image = StyleSheet.create({
	profile: {
		width: 50, 
		height: 50, 
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '#5ba4e5'
	}
})

const component = StyleSheet.create({
	top: {
		position: 'absolute',
		top: 0,
		height: 30,
		width: '100%',
	},
	header: {
		position: 'absolute',
		top: 50,
		height: 50,
		width: '100%',
		flexDirection: 'row',
		borderBottomRightRadius: 100,
		borderBottomLeftRadius: 100,
	},
	body: {
		marginTop: 80,
		width: '100%',
	},
	profile: {
		position: 'absolute',
		right: 3,
		top: 50,
	},
	fab: {
		position: 'absolute', 
        width: 58, 
        height: 57, 
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center', 
        right: 10, 
        bottom: 30, 
        backgroundColor: '#FFFCFC', 
        borderRadius: 50, 
        elevation: 3
	}
})