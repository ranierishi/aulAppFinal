import React, {createContext, useCallback, useState, useContext} from 'react';
import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
  const [data, setData] = useState(async()=>{
    const token = await AsyncStorage.getItem()
    const client = await AsyncStorage.getItem()

      if(token && client){
        return {token, client: JSON.parse(client) }
      }

      return {}
  })

  const signIn = useCallback(async(email,senha)=>{
    const response = await api.post('/login', {
      email,
      senha,
    })
    console.log('Response: ',response)
    const {token} = response.data
    const client = {
      email: response.data.email,
      nome: response.data.nome,
    }
    await AsyncStorage.setItem('@CarrosApp:token',token)
    await AsyncStorage.setItem('@CarrosApp:user', JSON.stringify(client))

    setData({token,client})
  },[])

  const signOut = useCallback(async()=>{
    await AsyncStorage.removeItem('@CarrosApp:token')
    await AsyncStorage.removeItem('@carrosApp:user')
    setData({})
  },[])

  return (
    <AuthContext.Provider value={{user: data.client, token: data.token, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth(){
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}