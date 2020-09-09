import * as React from 'react';
import { StyleSheet,View,Image,ScrollView,AsyncStorage } from 'react-native';
import { Button,Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class StartScreen extends React.Component{
	constructor(props) {
      super(props);
      this.state={
      	loading:true,
      }
    } 
    async componentDidMount() {
	    await Font.loadAsync({
	      'Roboto': require('native-base/Fonts/Roboto.ttf'),
	      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
	      ...Ionicons.font,
	    });    
	    this.setState({ loading: false })
	}
	render(){
	  	if(this.state.loading) {
	     return (
	       <View></View>
	     );
	   }
	  	return (
		    <View style={styles.blockContainer}>
			  <Text style={styles.FirstTitle}>
			    Добро пожаловать в mypets!
			  </Text>
			  <Image source={require('../dataImages/image/welcome.png')} />
			  <View style={{marginTop:50,width:"90%"}}>
			  	<Button full onPress={() => this.props.navigation.navigate('Регистрация')}>
			  		<Text>Регистрация</Text>
			  	</Button>
		    	<Button full style={{marginTop:20}} onPress={() => this.props.navigation.navigate('Авторизация')}>
		    		<Text>Авторизация</Text>
		    	</Button>
			  </View>    
			</View>
		);
	}
}

const styles = StyleSheet.create({
  FirstTitle:{
  	fontSize:20,
  	textAlign:'center',
  	marginTop:'20%'
  },
  blockContainer:{
  	  display: "flex",
	  flexDirection: "column",
	  alignItems: "center",
  },
});