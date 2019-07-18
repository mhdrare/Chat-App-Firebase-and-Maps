import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import User from '../../../User'

export default class App extends Component {

	logoutHandler = async () => {
		await firebase.auth().signOut()
		this.props.navigation.navigate('Loading')
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
					<View style={component.top}>
						<Image style={items.image} source={{uri: User.profile}}/>
						<View style={component.data}>
							<TouchableOpacity style={component.setting}>
								<MaterialCommunityIcons name="circle-edit-outline" size={20}/>
							</TouchableOpacity>
							<View style={component.dataName}>
								<Text style={items.name}>{User.name}</Text>
							</View>
							<View style={component.dataEmail}>
								<Text numberOfLines={1} style={items.email}>{User.email}</Text>
							</View>
						</View>
					</View>	
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
	top: {
		alignSelf: 'center',
		width: '80%',
		height: 150,
		flexDirection: 'row',
	},
	data: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column',
		height: '100%',
		marginLeft: 5,
	},
	dataName: {
		backgroundColor: '#5ba4e5',
		height: 30,
		borderTopLeftRadius: 10
	},
	dataEmail: {
		backgroundColor: '#5ba4e5',
		height: 30,
		borderBottomRightRadius: 10
	},
	setting: {
		alignSelf: 'flex-end',
		marginBottom: 3
	}
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
		width: 100,
		borderRadius: 500,
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 5
	},
	name: {
		flex: 1, 
		paddingTop: 3,
		paddingLeft: 10, 
		fontSize: 14,
		fontFamily: 'sans-serif-medium',
		color: '#ffffff'
	},
	email: {
		flex: 1, 
		paddingTop: 3,
		paddingLeft: 10, 
		fontSize: 13,
		fontFamily: 'sans-serif-thin',
		color: '#ffffff'
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