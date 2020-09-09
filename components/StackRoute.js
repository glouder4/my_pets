import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './StartScreen.js';
import SignUp from './Sign/SignUp.js';
import SignIn from './Sign/SignIn.js';
import Gamezone from './Gamezone/Gamezone.js';
    import Profile from './Profile/Profile.js';
import ShopPage from './Shop/ShopPage.js';
    import ShopClothesPage from './Shop/clothes/ShopClothesPage.js';
    import FoodPage from './Shop/food/FoodPage.js';
    import GetProductPage from './Shop/GetProductPage.js';

const Stack = createStackNavigator();
function Route(){    
  return (
    <NavigationContainer>
        <Stack.Navigator>
        	<Stack.Screen name="Вход" component={StartScreen} />
        	<Stack.Screen name="Регистрация" component={SignUp} />
        	<Stack.Screen name="Авторизация" component={SignIn} />
            <Stack.Screen name="Игровая зона" component={Gamezone} />
                <Stack.Screen name="Профиль" component={Profile} />
            <Stack.Screen name="Магазин" component={ShopPage} />
                <Stack.Screen name="Одежда. Наборы" component={ShopClothesPage} />
                <Stack.Screen name="Еда" component={FoodPage} />
                <Stack.Screen name="Покупка" component={GetProductPage} />
        </Stack.Navigator>    
    </NavigationContainer>
  );
}
export default Route;