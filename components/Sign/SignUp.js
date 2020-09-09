import * as React from 'react';
import { StyleSheet, Button,View,Image,ScrollView,AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Text,Footer, FooterTab, Icon, Badge, Tabs } from 'native-base';
import axios from 'axios';

const styles = StyleSheet.create({
  FirstTitle:{
  	fontSize:20,
  	textAlign:'center',
  	marginTop:'20%'
  },
  header:{
	  height:'100%',
	  width:'100%',
	  zIndex:1,
  },
  blockContainer:{
  	flex:1,
  	marginTop:0
  },
  smthWrong:{
  	color:'red',
  	borderColor:'red'
  },
  Success:{
  	color:'green',
  	borderColor:'green'
  }
});

export default class SignIn extends React.Component{
	constructor({ navigation }) {
	    super();
	    this.state = {
	      loading: false,
	      username:'',
	      password:'',
	      wrong:false,
	      success:false,
	      accessKey:'',
	      dataIncorrect:false,
	      employed:false,
	      forbiddenCharacters:false
	    };
	    this.handleChangeUsername = this.handleChangeUsername.bind(this);
	    this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	  }
	  handleChangeUsername(event) {
	  	this.setState({username: event.nativeEvent.text });
	  }
	  handleChangePassword(event) {
	  	this.setState({password: event.nativeEvent.text });
	  }
	  handleSubmit(event) {
	  	console.log('clicked');
	    if((this.state.username == '')||(this.state.password == '')){
	    	console.log(this.state);
	      this.setState({wrong: true });
	    }
	    else{
	      this.setState({wrong: false });
	      let toState = this;  
	      let userdata = { data: { 
	        login: toState.state.username,
	        password: toState.state.password,
	      }};
	      axios.post('http://192.168.0.101:3000/registerUser', JSON.stringify(userdata)).then(function (response) {
	        AsyncStorage.setItem('accessKey',response.data,function(){
	          toState.setState({success:true});
	          toState.setState({accessKey:response.data}); 
	          toState.props.navigation.navigate('Игровая зона')  
	        });
	      }).catch(function (error) {
	         if(error.response.data == "forbiddenCharacters"){
	            toState.setState({wrong: true });
	            toState.setState({forbiddenCharacters: true });
	          }
	          else{
	            toState.setState({wrong:true});
	            toState.setState({wrongMessage:'Не правильынй логин или пароль'});
	          }
	      });        
	    } 
	  }
	  render() {
       if(this.state.wrong == false){
        	if(this.state.success == false){
        		return (
			        <View style={styles.blockContainer}>
					  <Text style={styles.FirstTitle}>
					      Регистрация
					    </Text>
					    <Form>
					        <Item floatingLabel>
					          <Label>Логин</Label>			          
					          <Input value={this.state.username} onChange={this.handleChangeUsername} />
					        </Item>
					        <Item style={{marginBottom:50}} floatingLabel last>
					          <Label>Пароль</Label>
					          <Input secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword} />
					        </Item>	  
					        <Button title="Зарегистрироваться" onPress={this.handleSubmit}/>    
					    </Form>			    
					</View>   	
			      )
        	}	
        	else{
        		return (
        		<View style={styles.blockContainer}>
				 	<Text style={styles.FirstTitle,styles.Success}>
				      Успешно
				    </Text>
				    <Form>
				       <Item floatingLabel>
				          <Label>Логин</Label>			          
				          <Input style={styles.Success} value={this.state.username} onChange={this.handleChangeUsername} />
				        </Item>
				        <Item style={{marginBottom:50}} floatingLabel last>
				          <Label>Пароль</Label>
				          <Input style={styles.Success} secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword} />
				        </Item>	  
				        <Button title="Зарегистрироваться" onPress={this.handleSubmit}/>    
				    </Form>		    
				</View> 
				);
        	}       		
       }	
       else{
       	if(this.state.forbiddenCharacters == false){
       		if(this.state.employed == false){
	       		return (
			        <View style={styles.blockContainer}>
					  	<Text style={styles.FirstTitle}>
					      Регистрация
					    </Text>
					    <Text style={styles.smthWrong}>
					      Заполнены не все поля
					    </Text>
					    <Form>
					        <Item floatingLabel>
					          <Label>Логин</Label>			          
					          <Input value={this.state.username} onChange={this.handleChangeUsername} />
					        </Item>
					        <Item style={{marginBottom:50}} floatingLabel last>
					          <Label>Пароль</Label>
					          <Input secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword}/>
					        </Item>	  
					        <Button title="Зарегистрироваться" onPress={this.handleSubmit}/>    
					    </Form>			    
					</View>   	
			      )
	       	}
	       	else{
	       		return (
			        <View style={styles.blockContainer}>
					  	<Text style={styles.FirstTitle}>
					      Регистрация
					    </Text>
					    <Text style={styles.smthWrong}>
					      Данный логин уже занят
					    </Text>
					    <Form>
					        <Item floatingLabel>
					          <Label>Логин</Label>			          
					          <Input value={this.state.username} onChange={this.handleChangeUsername} />
					        </Item>
					        <Item style={{marginBottom:50}} floatingLabel last>
					          <Label>Пароль</Label>
					          <Input secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword}/>
					        </Item>	  
					        <Button title="Зарегистрироваться" onPress={this.handleSubmit}/>    
					    </Form>			    
					</View>   	
			      )
	       	}
       	}
       	else{
       		return (
		        <View style={styles.blockContainer}>
				  	<Text style={styles.FirstTitle}>
				      Регистрация
				    </Text>
				    <Text style={styles.smthWrong}>
				      Логин содержит запрещенные символы
				    </Text>
				    <Form>
				        <Item floatingLabel>
				          <Label>Логин</Label>			          
				          <Input value={this.state.username} onChange={this.handleChangeUsername} />
				        </Item>
				        <Item style={{marginBottom:50}} floatingLabel last>
				          <Label>Пароль</Label>
				          <Input secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword}/>
				        </Item>	  
				        <Button title="Зарегистрироваться" onPress={this.handleSubmit}/>    
				    </Form>			    
				</View>   	
		      )
       	}	       		       	   	
       }  
	  }
}