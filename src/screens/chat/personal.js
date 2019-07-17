import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class App extends Component {
	render(){
		return(
			<React.Fragment>
				<View style={component.header}>
					<TouchableOpacity style={items.flex} onPress={()=>this.props.navigation.goBack()}>
						<Icon name="leftcircle" size={24} color="#5ba4e5" />
					</TouchableOpacity>
					<View style={items.flex}>
						<Text style={items.title}>{this.props.navigation.state.params.name}</Text>
					</View>
					<View style={items.flex}>
						
					</View>
				</View>
				<View style={component.body}>
					<FlatList
						style = {component.chat}
						data = {
							[
								{
									id: 1,
									name: 'Kaneki Ken',
									username: 'kanekiken',
									image: 'https://i.pinimg.com/originals/fe/ad/d8/feadd8d042e5b3c2ed5134c5d3b07780.jpg'
								},
							]
						}
						keyExtractor = {(item) => item.id.toString()}
						renderItem = {({item, index}) => {
							return(
								<TouchableOpacity style={items.chatlist}>
									<Image style={items.image} source={{uri: item.image}}/>
									<View style={items.column}>
										<Text style={items.name}>{item.name}</Text>
										<Text style={items.person}>Kamu: <Text style={items.last}>Whoops!</Text></Text>
									</View>
								</TouchableOpacity>
							)
						}
					}>
						
					</FlatList>
				</View>
				<View style={component.footer}>
					<View style={component.sendchat}>
						<TextInput style={items.inputChat} placeholder="Type message"/>
						<TouchableOpacity style={items.sendChat}>
							<MaterialCommunityIcons name="send-circle" size={47} color="#5ba4e5"/>
						</TouchableOpacity>
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
	footer: {
		width: '100%',
		flex: 1,
	},
	sendchat: {
		width: '100%',
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20
	},
	chat: {
		borderTopWidth: 1,
		borderColor: '#f2f2f2',
	},
})

const items = StyleSheet.create({
	flex: {
		flex: 1,
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