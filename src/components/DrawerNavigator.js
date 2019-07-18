import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import User from '../../User'

export default class DrawerContent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uid: '',
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
			let person = val.val()
			person.uid = val.key
			if(person.uid === this.state.uid) {
				User.email = person.email
				User.uid = person.uid
			} else {
				this.setState((prevState)=>{
					return{
						users: [...prevState.users, person]
					}
				})
			}
		})
	}

	render(){
		return (
			<React.Fragment>
				<View style={component.search}>
					<TextInput style={items.search} placeholder="Search"/>
				</View>
				<View style={{flexDirection: 'row', paddingTop: 3}}>
					<View style={{flex: 1}}></View>
					<Text style={{flex: 2, textAlign: 'center'}}>Friend List</Text>
					<View style={{flex: 1}}></View>
				</View>
				<ScrollView>
					<View style={component.friendlist}>
						<FlatList
							style = {component.flatlist}
							data = { this.state.users }
							renderItem = {({item, index}) => {
								return(
									<TouchableOpacity style={items.flatlist}>
										<Image style={items.image} source={{uri: item.profile}}/>
										<View style={items.column}>
											<Text numberOfLines={1} style={{flex: 1, paddingLeft: 10, fontSize: 15, fontFamily: 'sans-serif-medium'}}>{item.name}</Text>
											<Text style={items.status}>online</Text>
										</View>
									</TouchableOpacity>
								)
							}
						}>
							
						</FlatList>
					</View>
				</ScrollView>
			</React.Fragment>
		)
	}
}

const items = StyleSheet.create({
	column: {
		flexDirection: 'column'
	},
	status: {
		flex: 1,
		fontSize: 12, 
		paddingLeft: 10,
		fontFamily: 'sans-serif-thin'
	},
	search: {
		width: '80%',
		height: '100%',
		borderWidth: 1,
		borderColor: '#5ba4e5',
		paddingLeft: 10,
		borderBottomRightRadius: 10,
	},
	flatlist: {
		flexDirection: 'row',
		height: 40,
		borderWidth: 1,
		borderColor: '#5ba4e5',
		marginTop: 3,
		borderBottomRightRadius: 10,
	},
	image: {
		resizeMode: 'contain',
		width: 35, 
		borderRadius: 500, 
		backgroundColor: '#5ba4e5'
	}
})

const component = StyleSheet.create({
	search: {
		alignItems: 'center',
		width: '100%',
		marginTop: 30,
		height: 45,
		paddingBottom: 5
	},
	friendlist: {
		width: '100%',
		alignItems: 'center',
		marginTop: 10,
		height: '100%'
	},
	flatlist: {
		width: '80%',
	}
})