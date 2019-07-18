import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import firebase from 'firebase'
import User from '../../../User'

export default class App extends Component {

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
			let person = val.val();
			person.uid = val.key
			if(person.email === this.state.email) {
				User.email = person.email,
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
		return(
			<React.Fragment>
				<View style={component.header}>
					<TouchableOpacity style={items.flex} onPress={()=>this.props.navigation.goBack()}>
						<Icon name="leftcircle" size={24} color="#5ba4e5" />
					</TouchableOpacity>
					<View style={items.flex}>
						<Text style={items.title}>Chats</Text>
					</View>
					<View style={items.flex}>
						
					</View>
				</View>
				<View style={component.body}>
					<FlatList
						style = {component.chat}
						data = {this.state.users}
						renderItem = {({item}) => {
							return(
								<TouchableOpacity style={items.chatlist} onPress={()=>this.props.navigation.navigate('Personal', item)}>
									<Image style={items.image} source={{uri: item.profile}}/>
									<View style={items.column}>
										<Text style={items.name}>{item.name}</Text>
										<Text style={items.person}>You: <Text style={items.last}>Whoops!</Text></Text>
									</View>
									<View style={component.right}>
										<Icon style={items.right} size={20}/>
										<EvilIcons style={items.right} name="chevron-right" size={30}/>
										<Icon style={items.right} size={20}/>
									</View>
								</TouchableOpacity>
							)
						}
					}>
						
					</FlatList>
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
		flex: 1,
	},
	chat: {
		borderTopWidth: 1,
		borderColor: '#f2f2f2',
	},
	right: {
		flexDirection: 'column'
	}
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
	right: {
		flex: 1,
	}
})