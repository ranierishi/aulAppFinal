import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity } from 'react-native';
import { Input } from './styles';
import { useAuth } from '../../hooks/AuthState';


const Login = ({navigation}) => {
  const {signIn} = useAuth()
  const [email, setEmail]= useState()
  const [senha, setSenha] = useState()

  const handleLogin = async() =>{
    try{
      console.log(email,senha)
      await signIn(email,senha)
      setEmail(undefined)
      setSenha(undefined)
      navigation.navigate('Carros')
    }catch(e){}
  }

  return( 
    <View style={{display:'flex', height:'100%', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
      <Text>Login</Text>
      <TextInput
        value={email}
        placeholder='E-mail'
        autoComplete='email'
        autoCapitalize='none'
        onChangeText={(e)=> setEmail(e)}
        style={{width: 220, height: 40, borderWidth:1, padding: 4, marginBottom:8, borderRadius:5}}
      />
      <Input  
        value={senha}
        placeholder='Senha'
        secureTextEntry       
        onChangeText={(e)=> setSenha(e)}     
      />
      <TouchableOpacity
        onPress={()=> handleLogin()}
        style={{width: 220, height: 40, padding: 4, marginBottom:8, borderRadius:5, backgroundColor:'lightgreen'}}
      >
        <Text style={{alignSelf:'center', color:'white', fontWeight:'bold',fontSize:18}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=> navigation.navigate('Cadastro')}
        style={{width: 220, height: 40, padding: 4, marginBottom:8, borderRadius:5, backgroundColor:'lightgreen'}}
      >
        <Text style={{alignSelf:'center', color:'white', fontWeight:'bold',fontSize:18}}>Cadastro</Text>
      </TouchableOpacity>
    </View>
    )
}

export default Login;