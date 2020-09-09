import * as React from 'react';
import { StyleSheet,View,Image,ScrollView,ProgressBarAndroid,ImageBackground,AsyncStorage} from 'react-native';
import { Container, Button,Header, Content, Form, Item, Input, Label,Text,Footer, FooterTab, Icon, Badge, Tabs } from 'native-base';
import axios from 'axios';

import GetProfile from '../Profile/getProfile';

import GamezoneHeader from '../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../Gamezone/GamezoneNavigationBar';

export default class GameZone extends React.Component{
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
	    this.toClothesPage = this.toClothesPage.bind(this);
	    this.toFoodPage = this.toFoodPage.bind(this);
	}
	toClothesPage(event) {
		this.props.navigation.navigate('Одежда. Наборы')
	}
	toFoodPage(event) {
		this.props.navigation.navigate('Еда')
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
	   	return (
		    <View style={styles.blockContainer}>
			  <GamezoneHeader userData={this} />
			  <View style={styles.shopBar}>
			  	<Button full transparent light  onPress={ this.toClothesPage }>
		  			<View style={{flexDirection:"column",width:"10%"}}>
		  				<Image source={require('../../dataImages/image/item/suit1.png')} />
		  			</View>
		  			<View style={{flexDirection:"column",width:"80%",alignItems:"flex-start"}}>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#007c1d"}}>Одежда</Text>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:13,color:"#b14700"}}>Модные вещи и аксессуары для твоего питомца</Text>
		  			</View>			    		
		    	</Button>
			  </View>
			  <View style={styles.shopBar}>
			  	<Button full transparent light onPress={function(){ console.log(123); }}>
		  			<View style={{flexDirection:"column",width:"10%"}}>
		  				<Image source={require('../../dataImages/image/item/vip2.png')} />
		  			</View>
		  			<View style={{flexDirection:"column",width:"80%",alignItems:"flex-start"}}>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#007c1d"}}>Бонусы</Text>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:13,color:"#b14700"}}>Получи преимущество в красоте и скорости обучения</Text>
		  			</View>			    		
		    	</Button>
			  </View>
			  <View style={styles.shopBar}>
			  	<Button full transparent light onPress={ this.toFoodPage }>
		  			<View style={{flexDirection:"column",width:"10%"}}>
		  				<Image source={require('../../dataImages/image/item/meat.png')} />
		  			</View>
		  			<View style={{flexDirection:"column",width:"80%",alignItems:"flex-start"}}>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#007c1d"}}>Еда</Text>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:13,color:"#b14700"}}>Угощай своего питомца изыскаными лакомствами</Text>
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