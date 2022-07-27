/*
By Hernane Velozo | July/2022
*/

//use"State" é um Hook (permite criar componentes funcionais) para armazenar estados

import React, { useState, useEffect } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
}from 'react-native';
import {Button} from '../components/Button';
import { SkillCard } from '../components/SkillCard';


interface SkillData{
    id: string;
    name: string;
}

export function Home(){
    //estado e função que atualiza o estado com uma string / vetor (a segunda)
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');
    
    //funçao que recupera o estado armazenado anteriormente (oldState)
    //e cria um novo vetor
    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill 
        }
        //adciona na coleção um objeto com id e name
        setMySkills(oldState =>[...oldState, data]);
    }
    
    function handleRemoveSkill(id: string){
        setMySkills(oldState => oldState.filter(
            skill => skill.id !==id
        ));
    }

    //Hook que exibe uma mensagem de saudação de acordo com o horário   
    useEffect(() => {
        const currentHour = new Date().getHours();
        
        if(currentHour < 12 ){
            setGretting('Bom dia');
        }else if(currentHour >= 12 && currentHour < 18){
            setGretting('Boa tarde');
        }else{
            setGretting('Boa noite');
        }

    }, []);

    return (
        <View style={styles.container}>
            <Text style = {styles.title}>
                Bem-vindo, Hernane Velozo. 
            </Text>

        <Text style={styles.greetings}>
            {gretting}
        </Text>
            
        <TextInput 
            style={styles.input}
            placeholder="New skill"
            placeholderTextColor="#555"
            onChangeText={setNewSkill}
        />
 
        <Button 
            title = 'Adicionar'
            onPress={handleAddNewSkill}
            activeOpacity={.7}
        />
        


        <Text style={[styles.title, {marginVertical: 50}]}>
            My Skills
        </Text>

        <FlatList
            showsVerticalScrollIndicator={false}
            data={mySkills} //coleção de dados
            keyExtractor={item =>item.id} // recupera ID | Lida com chaves
            renderItem={({item}) => ( 
                <SkillCard 
                skill={item.name} // mostra qual o item a renderizar
                onPress={() => handleRemoveSkill(item.id)}
                />
            )}
        /> 
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical:    70,
        paddingHorizontal:  30
    },
    title:{
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize:  18,
        padding: Platform.OS == 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
    greetings: {
        color: '#FFF'
    }
});