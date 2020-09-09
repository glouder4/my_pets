import * as React from 'react';
import { StyleSheet,View,Image,ImageBackground,AsyncStorage} from 'react-native';
import { Button,Text } from 'native-base';
import axios from 'axios';

import GamezoneHeader from '../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../Gamezone/GamezoneNavigationBar';

const image = { uri: "../../dataImages/img/bg-bbtn-bg.png" };

export default class GetProductPage extends React.Component{
	constructor({ navigation }) {
	    super();
	    this.state = {
	      loading: false,
	      coins:'',
	      beauties:0,
	      hearts:0,
	      accessKey:'',
	      level: 1,
	      levelProgress:0.1,
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
			  <View style={[styles.shopBar,styles.RowView]}>
		  		<View style={{width:"10%",marginTop:15}}>
	  				<Image source={require('../../dataImages/image/item/suit3.png')} />
	  			</View>
	  			<View style={{width:"80%",alignItems:"flex-start",marginTop:15}}>
	    			<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#d57120"}}>Зеленый костюмчик</Text>
	    			<Text style={{width:"100%",textAlign:"left",fontSize:13,color:"#b14700"}}>Одежда +6</Text>
	    			<Button rounded style={{backgroundColor:"rgb(83,179,0)",paddingLeft:5,paddingRight:5}}>
		    			<Text>Купить за 40</Text>
				    </Button>
	  			</View>	
			  </View>
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
   height: 120,
   padding:5,
   marginTop:20,
   width:"90%",
   backgroundColor: '#fff',
   borderColor: '#ca900c',
   borderWidth: 1,
   borderRadius: 9,
   justifyContent:'center'
 },
  progressBar: {
   height: 20,
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5
 },
 image: {
    width:'60%',
    resizeMode: "cover",
  },
});