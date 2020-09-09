import * as React from 'react';
import { StyleSheet,View,Image,ScrollView,ProgressBarAndroid,ImageBackground,AsyncStorage} from 'react-native';
import { Container, Button,Header, Content, Form, Item, Input, Label,Text,Footer, FooterTab, Icon, Badge, Tabs } from 'native-base';
import axios from 'axios';

import GetProfile from '../Profile/getProfile';

import GamezoneHeader from '../Gamezone/GamezoneHeader';
import GamezoneNavigationBar from '../Gamezone/GamezoneNavigationBar';

function TapBar(props){
	let output1; let output2 ; let output3;
	let mediapath = 'http://192.168.0.102:3000/';
	if(props.userData.state.tap1 != 'null'){ 
		output1 = (
			<Button full transparent light onPress={props.userData.handleFeed }>
				<Image source={require('../../dataImages/img/bgNotEmpty.png')} />
				<Image style={{position:"absolute",width:"90%",height:45}} source={ {uri: mediapath+'dataImages/'+props.userData.state.tap1.image} } />
			</Button>
		)
	}
	else{
		output1 = (
			<Button full transparent light>
				<Image source={require('../../dataImages/img/tapEmpty.png')} />
			</Button>
		)
	}
	 if(props.userData.state.tap2 != 'null'){
		output2 = (
			<Button full transparent light onPress={function(){ console.log(123); }}>
				<Image source={require('../../dataImages/img/bgNotEmpty.png')} />
				<Image style={{position:"absolute"}} source={ {uri: mediapath+'dataImages/'+props.userData.state.tap2} } />
			</Button>
		)
	}
	else{
		output2 = (
			<Button full transparent light>
				<Image source={require('../../dataImages/img/tapEmpty.png')} />
			</Button>
		)
	}
	if(props.userData.state.tap3 != 'null'){
		output3 = (
			<Button full transparent light onPress={function(){ console.log(123); }}>
				<Image source={require('../../dataImages/img/bgNotEmpty.png')} />
				<Image style={{position:"absolute"}} source={ {uri: mediapath+'dataImages/'+props.userData.state.tap3} } />
			</Button>
		)
	}
	else{
		output3 = (
			<Button full transparent light>
				<Image source={require('../../dataImages/img/tapEmpty.png')} />
			</Button>
		)
	}
	return(
		<View style={[{width:"80%",marginTop:25,justifyContent:"space-between"},styles.RowView]}>
			<View style={styles.RowView}>
				{output1}
			</View>	
			<View style={styles.RowView}>
				{output2}
			</View>	
			<View style={styles.RowView}>
				{output3}
			</View>				
		</View>
	)
}
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
	    this.handleFeed = this.handleFeed.bind(this);
	    this.toShopPage = this.toShopPage.bind(this);
	}
	handleFeed(event) {
	  	this.setState({clicks: this.state.clicks+1 });
	  	this.setState({coins:this.state.coins+this.state.tap1.tap_coin});
	  	this.setState({hearts:this.state.hearts+this.state.tap1.tap_hearts});

	  	let levelProgress = parseFloat(this.state.levelProgress)+ parseFloat(( this.state.tap1.tap_exp/this.state.nextlevelpoint ));
	  	if(levelProgress >= 1){
	  		levelProgress = (parseFloat(levelProgress)-1.0);
	  		this.setState({level:this.state.level+1})
	  		this.setState({levelProgress:levelProgress})
	  		this.setState({nextlevelpoint: this.state.nextlevelpoint*2})
	  	}
	  	else{
	  		this.setState({levelProgress: levelProgress });
	  	}  	
	  	if(this.state.clicks >= 10){
	  		let toState = this;
	  		axios.post('http://192.168.0.102:3000/updateProfile', JSON.stringify({
	  			accessKey:toState.state.accessKey,
	  			coins:toState.state.coins,
	  			beauties:toState.state.beauties,
	  			hearts:toState.state.hearts,
	  			level:toState.state.level,
	  			levelProgress: toState.state.levelProgress,
	  			nextlevelpoint: toState.state.nextlevelpoint,
	  		})).then(function (response) {	  	
	  			console.log('updated');		
	        }).catch(function(err){
	            console.log(27,err);
	        }) 
	        this.setState({clicks: 0 });
	  	}
	}
	toShopPage(event) {
		this.props.navigation.navigate('Магазин')
	}
	async componentDidMount() {  
	    this.setState({ loading: false })
	    let toState = this;
	    const value = await AsyncStorage.getItem('accessKey');
	    if (value !== null) {
	    	this.setState({accessKey:value});
	    }
	    else{
	    	console.log('null');	    	
	    	this.props.navigation.navigate('Вход')
	    } 
	}
	render(){
	  	if((this.state.loading) || !(this.state.accesGranted)) {
	     return (
	       <View><GetProfile userData={this} /></View>
	     );
	   }
	   if(this.state.accesGranted){
	   	return (
		    <View style={styles.blockContainer}>
			  <GamezoneHeader userData={this} />
			  <TapBar userData={this} />
			  <View style={styles.shopBar}>
			  	<Button full transparent light onPress={ this.toShopPage }>
		  			<View style={{flexDirection:"column",width:"10%"}}>
		  				<Image source={require('../../dataImages/img/ico20-shop.png')} />
		  			</View>
		  			<View style={{flexDirection:"column",width:"80%",alignItems:"flex-start"}}>
		    			<Text style={{width:"100%",textAlign:"left",fontSize:17,color:"#007c1d"}}>Магазин</Text>
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
   height: 50,
   marginTop:50,
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