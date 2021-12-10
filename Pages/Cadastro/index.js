import React, {useState} from 'react';
import { View, Text, TextInput,TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { Input } from './styles';

// import { Container } from './styles';

const Cadastro = ({navigation}) => {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  const handleCadastrar = async() =>{
    try{
      const resp = await api.post('pessoas',{nome,email,senha})
      console.log(resp.data)
      navigation.navigate('Login')
    }catch(e){}

  }

  return( 
    <View style={{display:'flex', height:'100%', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
      <Text>Cadastro</Text>
      <TextInput
        value={nome}
        placeholder='Nome'
        autoCapitalize='none'
        onChangeText={(e)=> setNome(e)}
        style={{width: 220, height: 40, borderWidth:1, padding: 4, marginBottom:8, borderRadius:5}}
      />
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
        onChangeText={(e)=> setSenha(e)}     
      />     

      <TouchableOpacity
        onPress={()=> handleCadastrar()}
        style={{width: 220, height: 40, padding: 4, marginBottom:8, borderRadius:5, backgroundColor:'lightgreen'}}
      >
        <Text style={{alignSelf:'center', color:'white', fontWeight:'bold',fontSize:18}}>Cadastro</Text>
      </TouchableOpacity>
    </View>
    )
}

export default Cadastro;