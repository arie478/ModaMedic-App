import {Constants} from "expo-constants";
import { Platform } from "react-native";

const backendUri = 'https://modamedic.cs.bgu.ac.il';

const ENV = {
    API_URL: {
        login: 'https://modamedic.cs.bgu.ac.il/users/login',
        signup: 'https://modamedic.cs.bgu.ac.il/users/patientRegister',
        personalDetalis:'https://modamedic.cs.bgu.ac.il/auth/usersAll/patientUpdateAndroid',
        metrics: 'https://modamedic.cs.bgu.ac.il/auth/patients/metrics',
        answers: 'https://modamedic.cs.bgu.ac.il/auth/patients/answers'
    },

// const backendUri = 'https://rps.ise.bgu.ac.il/njsw18';
//
// const ENV = {
//     API_URL: {
//         login: 'https://rps.ise.bgu.ac.il/njsw18users/login',
//         signup: 'https://rps.ise.bgu.ac.il/njsw18users/patientRegister',
//         personalDetalis:'https://rps.ise.bgu.ac.il/njsw18auth/usersAll/patientUpdateAndroid',
//         metrics: 'https://rps.ise.bgu.ac.il/njsw18auth/patients/metrics',
//         answers: 'https://rps.ise.bgu.ac.il/njsw18auth/patients/answers'
//     },
    // API_URL: {
    //     login: 'http://localhost:8181/users/login',
    //     signup: 'http://localhost:8181/users/patientRegister',
    //     personalDetalis:'http://localhost:8181/auth/usersAll/patientUpdateAndroid',
    //     metrics: 'http://localhost:8181/auth/patients/metrics',
    //     answers: 'http://localhost:8181/auth/patients/answers'
    // },
}

export default ENV