import * as React from 'react';
import { StyleSheet,View,Image,ProgressBarAndroid} from 'react-native';
import { Text } from 'native-base';
import axios from 'axios';

function GamezoneHeader(props){
  return(
  		<View style={{width:"100%",flexDirection: "column",alignItems: "center"}}>
  			<View style={styles.headerContainer}>
				<View style={styles.RowView}>
					<View style={{width:"15%"}}>
						<Image source={require('../../dataImages/image/avatar_s0.png')} />
					</View>
					<View style={[{width:"85%",justifyContent:"space-between"},styles.RowView]}>
						<View style={styles.RowView}>
							<Text>{props.userData.state.beauties}</Text>
							<Image source={require('../../dataImages/image/icons/beauty.png')} />
						</View>	
						<View style={styles.RowView}>
							<Text>{props.userData.state.coins}</Text>
							<Image source={require('../../dataImages/image/icons/coin.png')} />
						</View>	
						<View style={styles.RowView}>
							<Text>{props.userData.state.hearts}</Text>
							<Image source={require('../../dataImages/image/icons/heart.png')} />
						</View>				
					</View>
				</View>						
			</View>
			<View style={[{width:"100%",marginTop:5,backgroundColor:"#fcf8df"}]}>
				<View style={{width:"90%",alignSelf:"center"}}>
					<View style={[styles.RowView,{display: "flex",alignItems: "center"}]}>
						<View style={[{width:"5%"},styles.RowView]}>
							<Text>{props.userData.state.level}</Text>
							<Image source={require('../../dataImages/image/icons/up.png')} />
						</View>
						<ProgressBarAndroid
							style={[{width:"85%"},styles.progressBar]}
				        	styleAttr="Horizontal"
				        	indeterminate={false}
				        	progress={parseFloat(props.userData.state.levelProgress)}
				        />
				        <View style={{width:"10%",alignItems: "center"}}>
							<Text style={{textAlign:"center"}}>{parseFloat(props.userData.state.levelProgress).toFixed(2)}</Text>
						</View>
					</View>					
				</View>				
			</View>	
  		</View>		
	);
}
export default GamezoneHeader;


const styles = StyleSheet.create({
  headerContainer:{
  	width:"90%",
  	display: "flex",
	flexDirection: "column",
	alignItems: "center",
  },
  RowView:{
  	flexDirection: "row"
  },
  progressBar: {
   height: 20,
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 6,
   borderRadius: 5,
   backgroundColor:"#fcf8df"
 },
});