import React,{createContext,useContext,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InternalGroupContext = createContext( {})

export const GroupContext = ({children}) => {
    const [groups,setgroups] = useState([])
    const [traveldates,settraveldates] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('groups').then(data => {
            console.log('data', data)
            if(data !== null) {
                setgroups(JSON.parse(data))
            }else{
                setgroups([])
            }
        }).catch(err => {
            alert(err.message)
        })
    },[])

    return(
        <InternalGroupContext.Provider value={{groups,setgroups,traveldates,settraveldates}}>
            {children}
        </InternalGroupContext.Provider>
    )
}

export const useGroup = () => useContext(InternalGroupContext)
