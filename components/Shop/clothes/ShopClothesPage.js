import * as React from 'react';
import { StyleSheet,View,Image,AsyncStorage} from 'react-native';
import { Button,Text } from 'native-base';
import axios from 'axios';

import GamezoneHeader from '../../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../../Gamezone/GamezoneNavigationBar';

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
	   	let toState = this;
	   	return (
		    <View style={styles.blockContainer}>
			  <GamezoneHeader userData={this} />
			  <View style={styles.shopBar}>
			  	<Button full transparent light style={{flexDirection:"column"}} onPress={function(){ toState.props.navigation.navigate('Покупка') }}>
			  		<View style={{flexDirection:"column",width:"100%",marginBottom:25}}>
		    			<Text style={{width:"100%",textAlign:"center",fontSize:17,color:"#d57120"}}>Зеленый комплект</Text>
		    			<Text style={{width:"100%",textAlign:"center",fontSize:13,color:"#b14700"}}>Лучший выбор!</Text>
		  			</View>	
		  			<View style={{flexDirection:"column",width:"100%"}}>
		  				<View style={[{width:'40%',alignSelf:'center',justifyContent:'space-between'},styles.RowView]}>
		  					<Image source={require('../../../dataImages/image/item/suit3.png')} />
		  					<Image source={require('../../../dataImages/image/item/pants3.png')} />
		  					<Image source={require('../../../dataImages/image/item/bow3.png')} />
		  				</View>	
		  				<View style={[{width:'40%',alignSelf:'center',justifyContent:'space-between'},styles.RowView]}>
		  					<Image source={require('../../../dataImages/image/item/collar3.png')} />
		  					<Image source={require('../../../dataImages/image/item/medallion3.png')} />
		  					<Image source={require('../../../dataImages/image/item/ring3.png')} />
		  				</View>		  				
		  			</View>		  					    		
		    	</Button>
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
   height: 200,
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