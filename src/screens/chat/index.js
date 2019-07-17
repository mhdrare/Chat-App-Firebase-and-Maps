import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default class App extends Component {
	render(){
		return(
			<React.Fragment>
				<View style={component.header}>
					<TouchableOpacity style={items.flex} onPress={()=>this.props.navigation.goBack()}>
						<Icon name="leftcircle" size={24} color="#5ba4e5" />
					</TouchableOpacity>
					<View style={items.flex}>
						<Text style={items.title}>Chat</Text>
					</View>
					<View style={items.flex}>
						
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
	}
})