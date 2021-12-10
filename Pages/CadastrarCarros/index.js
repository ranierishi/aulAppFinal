import React, {useState} from 'react';
import { View, Text, TextInput,TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import { Input } from './styles';

// import { Container } from './styles';

const CadastrarCarros = ({navigation}) => {
  const [marca, setMarca] = useState()
  const [modelo, setModelo] = useState()
  const [anoF, setAnoF] = useState()
  const [anoM, setAnoM] = useState()
  const [cor, setCor] = useState()

  const handleCadastrar = async() =>{
    try{
      const dados = {
        marca,
        modelo,
        anoFabricacao: Number(anoF),
        anoModelo: Number(anoM),
        cor,

      }
      const resp = await api.post('carros',dados)
      if(resp.status === 200){
        Alert.alert('Veículo criado com sucesso')
        navigation.navigate('Carros',{atualizar:true})
      }
      // console.log(resp.data)
      // navigation.navigate('Login')
    }catch(e){
      Alert.alert('Erro ao criar veículo')
    }

  }

  return( 
    <View style={{display:'flex', height:'100%', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
      <Text>Cadastro</Text>
      <TextInput
        value={marca}
        placeholder='Marca'
        onChangeText={(e)=> setMarca(e)}
        style={{width: 220, height: 40, borderWidth:1, padding: 4, marginBottom:8, borderRadius:5}}
      />
      <TextInput
        value={modelo}
        placeholder='Modelo'        
        onChangeText={(e)=> setModelo(e)}
        style={{width: 220, height: 40, borderWidth:1, padding: 4, marginBottom:8, borderRadius:5}}
      />
      <Input  
        value={anoF}
        placeholder='Ano de Fabricação'
        onChangeText={(e)=> setAnoF(e)}     
      />
      <Input  
        value={anoM}
        placeholder='Ano do Modelo'
        onChangeText={(e)=> setAnoM(e)}
      /> 
       <Input  
        value={cor}
        placeholder='Cor'
        onChangeText={(e)=> setCor(e)}
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

export default CadastrarCarros;