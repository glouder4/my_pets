import * as React from 'react';
import { StyleSheet,View,Image,AsyncStorage} from 'react-native';
import { Button,Text } from 'native-base';

import GetProfile from '../../Profile/getProfile';

import GamezoneHeader from '../../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../../Gamezone/GamezoneNavigationBar';

export default class FoodPage extends React.Component{
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
	    }
	    else{
	    	console.log('null');	    	
	    	this.props.navigation.navigate('Вход')
	    } 
	}
	render(){
	  	if((this.state.loading) || !(this.state.accesGranted)) {
	     return (
	        <GetProfile userData={this} />
	     );
	   }
	   if(this.state.accesGranted){
	   	let toState = this;
	   	return (
		    <View style={styles.blockContainer}>
			  <GamezoneHeader userData={this} />
			  <View style={[styles.shopBar,styles.RowView]}>
		  		<View style={{width:"10%",marginTop:15}}>
	  				<Image source={require('../../../dataImages/image/item/suit3.png')} />
	  			</View>
	  			<View style={[{width:"80%",alignItems:"flex-start",justifyContent:"space-between",marginTop:15},styles.RowView]}>
	  				<View style={{justifyContent:"center"}}>
	  					<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#d57120"}}>Зеленый костюмчик</Text>
	    				<Text style={{width:"100%",textAlign:"left",fontSize:13,color:"#b14700"}}>Одежда +6</Text>
	  				</View>	  
	  				<View style={{justifyContent:"center"}}>
	  					<Button rounded style={{backgroundColor:"rgb(83,179,0)",paddingLeft:5,paddingRight:5}}>
			    			<Text>Купить за 40</Text>
					    </Button>
	  				</View> 	
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
   height: 100,
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
    width:"100%"
  },
});