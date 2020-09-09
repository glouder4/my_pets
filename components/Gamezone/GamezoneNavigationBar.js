import * as React from 'react';
import { StyleSheet,View,Image,ProgressBarAndroid} from 'react-native';
import { Text,Button } from 'native-base';

function GamezoneNavigationBar(props){
  return(
	<View style={[styles.RowView,{marginTop:50,width:"90%",justifyContent:"space-between"}]}>
	  	<View style={{width:"50%",height:"100%",alignSelf:"center"}}>
	  		<Button full transparent light onPress={() => props.navigation.navigate('Игровая зона')}>
	  			<View style={{flexDirection:"column",width:"100%",height:125,alignItems:"center"}}>
	  				<Image style={{width:"40%",height:125}} source={require('../../dataImages/img/bmenu-home.png')} />
	    			<Text>Главная</Text>
	  			</View>	
		  	</Button>
	  	</View>	
	  	<View style={{width:"50%",height:"100%"}}>
	  		<Button full transparent light onPress={() => props.navigation.navigate('Профиль')}>
	  			<View style={{flexDirection:"column",width:"100%",height:125,alignItems:"center"}}>
	  				<Image style={{width:"40%",height:125,justifyContent:"center"}} source={require('../../dataImages/img/ava0.png')} />
	    			<Text>Питомец</Text>
	  			</View>			    		
	    	</Button>
	  	</View>
	  </View> 
	);
}
export default GamezoneNavigationBar;


const styles = StyleSheet.create({
  RowView:{
  	flexDirection: "row",
  	backgroundColor:"#F9DFA5"
  },
});