import * as React from 'react';
import { StyleSheet,View,Image,ProgressBarAndroid} from 'react-native';
import { Text } from 'native-base';
import axios from 'axios';

function GetProfile(props){
	axios.post('http://192.168.0.102:3000/getProfile', JSON.stringify({accessKey:props.userData.state.accessKey})).then(function (response) {
		props.userData.setState({coins: response.data.coins });
		props.userData.setState({clicks: 0 });
		props.userData.setState({beauties: response.data.beauties });
		props.userData.setState({hearts: response.data.hearts });
		props.userData.setState({level: response.data.level });	  			
		props.userData.setState({levelProgress: response.data.levelprogress });
		props.userData.setState({nextlevelpoint: response.data.nextlevelpoint });
		props.userData.setState({tap1: JSON.parse(response.data.tap1) });
		props.userData.setState({tap2: response.data.tap2 });
		props.userData.setState({tap3: response.data.tap3 });
		props.userData.setState({accesGranted:true}); 	 			
    }).catch(function(err){
        console.log(44,err);
    }) 
  return(
  		<View></View>	
	);
}
export default GetProfile;