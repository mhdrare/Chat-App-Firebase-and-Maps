import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import moment from 'moment'
import User from '../../../User'

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			textMessage: null,
			uid: '',
			person: {
				uid: props.navigation.getParam('uid')
			},
			messageList: []
		};
	}

	componentWillMount(){
		firebase.database().ref('messages/')
			.child(User.uid)
			.child(this.state.person.uid)
			.on('child_added', (value)=>{
				this.setState((prevState)=>{
					return {
						messageList: [value.val(), ...prevState.messageList]
					}
				})
			})
	}

	sendMessage = async () => {

		if (this.state.textMessage.length > 0) {
			let message = firebase.database().ref(`messages`)
				.child(User.uid)
				.child(this.state.person.uid)
				.push().key
			let updates = {}
			let msg = {
				message: this.state.textMessage,
				time: new Date(),
				from: User.email
			}

			this.setState({ textMessage: '' })

			updates[`messages/${User.uid}/${this.state.person.uid}/${message}`] = msg
			updates[`messages/${this.state.person.uid}/${User.uid}/${message}`] = msg
			await firebase.database().ref().update(updates);

		}
		
	}


	render(){
		return(
			<React.Fragment>
				<View style={component.header}>
					<TouchableOpacity style={items.flex} onPress={()=>this.props.navigation.goBack()}>
						<Icon name="leftcircle" size={24} color="#5ba4e5" />
					</TouchableOpacity>
					<View style={items.flex}>
						<Text style={items.title}>{this.props.navigation.getParam('name')}</Text>
					</View>
					<View style={items.flex}>
						
					</View>
				</View>
				<View style={component.body}>
					<FlatList
						inverted
						style = {component.chat}
						data = {this.state.messageList}
						renderItem = {({item, index}) => {
							return(
								<View style={item.from === User.email ? items.chatme : items.chatfriend}>
									<View style={items.column}>
										<Text style={items.name}>{item.message}</Text>
										<Text style={items.date}>{moment(item.time).format('h:mm')}</Text>
									</View>
								</View>
							)
						}
					}>
						
					</FlatList>
				</View>
				<View style={component.footer}>
					<View style={component.sendchat}>
						<TextInput style={items.inputChat} multiline={true} placeholder="Type message" value={this.state.textMessage} onChangeText={(value)=>this.setState({textMessage: value})}/>
						<TouchableOpacity style={items.sendChat} onPress={this.sendMessage}>
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
		flex: 10,
	},
	footer: {
		width: '100%',
		flex: 1,
		marginBottom: 15
	},
	sendchat: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	chat: {
		borderTopWidth: 1,
		borderColor: '#f2f2f2',
		paddingBottom: 20,
		margin: 10
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
	chatme: {
		alignSelf: 'flex-end',
		paddingLeft: 10,
		flexDirection: 'row',
		maxWidth: '80%',
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15,
		backgroundColor: '#5ba4e5',
		margin: 3
	},
	chatfriend: {
		alignSelf: 'flex-start',
		paddingLeft: 10,
		flexDirection: 'row',
		maxWidth: '80%',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		borderColor: '#5ba4e5',
		borderWidth: 1,
		margin: 3
	},
	image: {
		resizeMode: 'contain', 
		width: 45, 
		borderRadius: 500,
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingRight: 5
	},
	name: {
		paddingTop: 10,
		paddingBottom: 5,
		paddingLeft: 5,
		paddingRight: 5,
		fontSize: 15, 
		fontFamily: 'sans-serif'
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
	},
	date: {
		alignSelf: 'flex-end',
		paddingRight: 10,
		paddingBottom: 5,
		fontSize: 12
	}
})