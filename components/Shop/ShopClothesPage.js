import * as React from 'react';
import { StyleSheet,View,Image,AsyncStorage} from 'react-native';
import {  } from 'native-base';
import axios from 'axios';

import GamezoneHeader from '../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../Gamezone/GamezoneNavigationBar';

export default class ShopClothesPage extends React.Component{
	constructor({ navigation }) {
	    super();
	    this.state = {
	      loading: false,
	      username:'',
	      coins:0,
	      clicks:0,
	      beauties:0,
	      hearts:0,
	      success:false,
	      accessKey:'',
	      level: 1,
	      levelProgress:0,
	      tap1:'',
	      tap2:'',
	      tap3:'',
	      nextlevelpoint:100,
	      accesGranted:false
	    };
	}
	async componentDidMount() {  
	    this.setState({ loading: false })
	    let toState = this;
	    const value = await AsyncStorage.getItem('accessKey');
	    if (value !== null) {
	    	this.setState({accessKey:value})
		    /*axios.post('http://192.168.0.100:3000/getProfile', JSON.stringify({accessKey:toState.state.accessKey})).then(function (response) {
	  			toState.setState({accesGranted:true});	      
	  			console.log( toState.state );  	 			
	        }).catch(function(err){
	            console.log(44,err);
	        }) */
	    }
	    else{
	    	console.log('null');	    	
	    	this.props.navigation.navigate('Вход')
	    } 
	}
	render(){
	  	if((this.state.loading) || !(this.state.accesGranted)) {
	     return (
	       <View></View>
	     );
	   }
	   if(this.state.accesGranted){
	   	return (
		    <View style={styles.blockContainer}>
			  <GamezoneHeader userData={this} />
			  <GamezoneNavigationBar navigation={this.props.navigation} />  
			</View>
		);
	   }	  	
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
	  backgroundColor:"#F9DFA5",
	  flex:1
  },
  headerContainer:{
  	width:"90%",
  	display: "flex",
	flexDirection: "column",
	alignItems: "center",
  },
  RowView:{
  	flexDirection: "row"
  },
  shopBar: {
   height: 60,
   padding:5,
   marginTop:20,
   width:"90%",
   backgroundColor: '#fbeed1',
   borderColor: '#ca900c',
   borderWidth: 1,
   borderRadius: 9
 },
  progressBar: {
   height: 20,
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5
 },
 image: {
    width:"100%"
  },
});