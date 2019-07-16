import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

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
	  	region: {
	  		latitude: LATITUDE,
	  		longitude: LONGITUDE,
	  		latitudeDelta: LATITUDE_DELTA,
	  		longitudeDelta: LONGITUDE_DELTA
	  	}
	  };
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
				<View style={items.image}>
					<Image source={{uri: 'https://i.pinimg.com/originals/32/02/c6/3202c6a860015bf19424333a13b23f38.jpg'}}/>
				</View>
			</React.Fragment>
		)
	}
}

const items = StyleSheet.create({
	image: {
		position: 'absolute',
		top: 0
	}
})

const image = StyleSheet.create({
	
})

const component = StyleSheet.create({
	
})