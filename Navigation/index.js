import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import ListarCarros from '../Pages/ListarCarros';
import CadastrarCarros from '../Pages/CadastrarCarros';
import Icon from 'react-native-vector-icons/AntDesign'
import { useAuth } from '../hooks/AuthState';

const Logout = () => <Icon name="logout" size={26} color="black"/>

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const{signOut} = useAuth()

  const handleLogout = async(navigation) => {
    try{
      await signOut()
      console.log(navigation)
      // navigation.navigate('Login')
    }catch(e){}
  }
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Carros" component={ListarCarros} options={({navigation})=>({
        headerLeft: ()=> null,
        headerRight: ()=> (
          <TouchableOpacity
            onPress={()=> {handleLogout(navigation);navigation.navigate('Login')}}
          >
            <Logout/>
          </TouchableOpacity>
        )
      })}/>
      <Stack.Screen name="Cadastrar Carros" component={CadastrarCarros} initialParams={{atualizar:false}}/>

    </Stack.Navigator>
  </NavigationContainer>
  )

}

export default Navigation;