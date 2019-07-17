import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

export default class App extends Component {

	logoutHandler = async () => {
		await firebase.auth().signOut()
		this.props.navigation.navigate('LogIn')
	}

	render(){
		return(
			<React.Fragment>
				<View style={component.header}>
					<TouchableOpacity style={items.flex} onPress={()=>this.props.navigation.goBack()}>
						<Icon name="leftcircle" size={24} color="#5ba4e5" />
					</TouchableOpacity>
					<View style={items.flex}>
						
					</View>
					<TouchableOpacity style={items.out} onPress={this.logoutHandler}>
						<Icon name="logout" size={24} color="#ff2d37"/>
					</TouchableOpacity>
				</View>
				<View style={component.body}>
					
				</View>
			</React.Fragment>
		)
	}
}

const component = StyleSheet.create({
	header: {
		height: 50,
		paddingLeft: 10,
		paddingRight: 10,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	body: {
		width: '100%',
		flex: 10,
	},
})

const items = StyleSheet.create({
	flex: {
		flex: 1,
	},
	out: {
		flex: 1,
		alignItems: 'flex-end'
	},
	title: {
		textAlign: 'center',
		fontSize: 17,
		fontFamily: 'sans-serif-thin'
	},
	chatlist: {
		height: 55,
		paddingLeft: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#f2f2f2'
	},
	image: {
		resizeMode: 'contain', 
		width: 45, 
		borderRadius: 500,
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 5
	},
	name: {
		flex: 1, 
		paddingTop: 5,
		paddingLeft: 10, 
		fontSize: 17, 
		fontFamily: 'sans-serif-medium'
	},
	last: {
		flex: 1,
		fontFamily: 'sans-serif-thin'
	},
	person: {
		flex: 1, 
		paddingLeft: 10,
		fontFamily: 'sans-serif-medium'
	},
	inputChat: {
		borderRadius: 100,
		borderWidth: 1,
		height: 40,
		flex: 6,
		paddingLeft: 15,
		borderColor: '#5ba4e5'
	},
	sendChat: {
		flex: 1
	}
})