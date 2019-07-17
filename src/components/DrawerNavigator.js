import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

export default class DrawerContent extends Component {
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
							data = {
								[
									{
										id: 1,
										name: 'Kaneki Ken',
										username: 'kanekiken',
										image: 'https://i.pinimg.com/originals/fe/ad/d8/feadd8d042e5b3c2ed5134c5d3b07780.jpg'
									},
									{
										id: 2,
										name: 'Osamu Dazai',
										username: 'dazaaii',
										image: 'https://i.pinimg.com/originals/09/9f/ad/099fad09c76a31c5a3fa00c3d345e2ee.jpg'
									},
									{
										id: 3,
										name: 'Deku',
										username: 'dekukude',
										image: 'https://i.pinimg.com/originals/42/b8/55/42b8552331f0834ecfc3eb383fef550a.jpg'
									},
									{
										id: 4,
										name: 'Hiroomi Nase',
										username: 'nanase',
										image: 'https://i.pinimg.com/originals/62/2b/01/622b0185a3023b7293ca01da64cc3a22.jpg'
									},
								]
							}
							keyExtractor = {(item) => item.id.toString()}
							renderItem = {({item, index}) => {
								return(
									<TouchableOpacity style={items.flatlist}>
										<Image style={items.image} source={{uri: item.image}}/>
										<View style={items.column}>
											<Text style={{flex: 1, paddingLeft: 10, fontSize: 15, fontFamily: 'sans-serif-medium'}}>{item.name}<Text style={{fontFamily: 'sans-serif-thin'}}> ({item.username}) </Text></Text>
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