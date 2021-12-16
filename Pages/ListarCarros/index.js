import React, { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { useAuth } from '../../hooks/AuthState';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native'

// import { Container } from './styles';

const ListarCarros = ({navigation, route}) => {
  const {user} = useAuth()
  const [carros, setCarros] = useState([])
  const isFocused = useIsFocused()
  useEffect(useCallback(async()=>{
    try{
      const {data} = await api.get('carros')
      console.log(data)
      // console.log(user) 
      setCarros(data)
    }catch(e){}
  }),[isFocused])

  const handleDelete = async(id) => {
    try{
      const {data} = await api.delete(`/carro/${id}`) 
      const car = carros.filter((carro)=> carro.id !== id)
      setCarros(car)
      console.log(data)
    }catch(e){}
  }
  return (
  <View style={{display:'flex', height:'100%', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
    <Text>{`Lista de ${user.nome}`}</Text>
    <View>
      {
        carros[0] ? carros.map((carro)=>(
          <View style={{display:'flex', flexDirection:'row'}}>
          <View key={carro.id} style={{borderWidth:1, borderRadius:5, display:'flex', flexDirection:'column'}}>
            <Text>{`Marca: ${carro.marca}`}</Text>
            <Text>{`Modelo: ${carro.modelo}`}</Text>
            <Text>{`Ano: ${carro.ano}`}</Text>
          </View>
          <TouchableOpacity 
            style={{borderWidth:1, borderRadius:5,}}
            onPress={()=>handleDelete(carro.id)}
          >
            <Text>Deletar</Text>
          </TouchableOpacity>
          </View>
        ))
        :<Text>Não há carros</Text>
      }
    </View>
    <TouchableOpacity
      onPress={()=> navigation.navigate('Cadastrar Carros',{carros,setCarros})}
      style={{position: 'absolute', bottom:8,right:8, alignSelf:'flex-end',width: 120, height: 40, padding: 4, marginBottom:8, borderRadius:5, backgroundColor:'lightgreen'}}
    >
      <Text style={{alignSelf:'center', color:'white', fontWeight:'bold',fontSize:18}}>Cadastrar</Text>
    </TouchableOpacity>
  </View>
  )
}

export default ListarCarros;