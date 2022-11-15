import React, {useState,useEffect} from 'react';
import { Keyboard} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Container, Button, 
    ButtonText, Title, SubTitle, 
    Input, Spacer} from '../../styles';
import { auth,db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Passenger = () => {    
    const [visible, setvisible] = useState(true); 
    const [name, setName] = useState(''); 
    const [curso, setCurso] = useState('');

    const navigator = useNavigation();   
    useEffect(() => {
        /*const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) navigator.navigate('Home');
        });*/
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', 
            () => setvisible(false),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', 
            () => setvisible(true),
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    },[]);

    const [passeger, setPasseger] = useState({
        passeger: auth.currentUser.uid,
        name: '',
        curso: '',
        telefone: '',
    })

    const newPasseger = () => {
        addDoc(collection(db, "passeger"), {
            passeger: auth.currentUser.uid,
            name: passeger.name,
            curso: passeger.curso,
            telefone: passeger.telefone,
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }


    
    return(
        <Container padding={40} justify="flex-start">
            <Container align="flex-start" height={80} >
                <Title>Cadastre</Title>
                <SubTitle>Preencha os campos abaixo.</SubTitle>
            </Container>
            <Container justify="flex-start">
                <Spacer height={40} />
                <Input 
                    placeholder="Nome" 
                    value={passeger.name}
                    onValueChange={(itemValue, itemIndex) => setPasseger({...passeger, name: itemValue})}
                />
                <Spacer height={20} />
                <Input 
                    placeholder="Curso" 
                    value={passeger.curso}
                    onValueChange={(itemValue, itemIndex) => setPasseger({...passeger, curso: itemValue})}
                    
                />
                <Spacer height={20} />
                <Input 
                    placeholder="Telefone"
                    value={passeger.telefone}
                    onValueChange={(itemValue, itemIndex) => setPasseger({...passeger, telefone: itemValue})}
                />
                <Spacer height={20} />
            </Container>
                <Container 
                    height={70} 
                    justify="flex-end"
                    align="flex-end"
                >
                    {visible && (
                        <Button 
                            onPress={() => newPasseger()}
                        >
                            <ButtonText>Começar a usar</ButtonText>
                        </Button>
                    )}
                </Container>
        </Container>
    );
}

export default Passenger;