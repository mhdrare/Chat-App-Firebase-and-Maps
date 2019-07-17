import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native'

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogin: 1
		};
	}

	componentDidMount(){
		if (this.state.isLogin == 1) {
			this.props.navigation.navigate('Home')
		} else {
			this.props.navigation.navigate('Auth')
		}
	}

	render(){
		return(
			<React.Fragment>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color="#5ba4e5" />
				</View>
			</React.Fragment>
		)
	}
}
