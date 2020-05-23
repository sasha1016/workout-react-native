
import { 
    API,
    V1
} from "../config/api";
const axios = require('axios') ; 

class User {

    firstName = null ; 
    id = null; 
    lastName = null ; 
    email = null ; 

    static exists(id) {
        //axios.post(API.V1 + V1.USER.ADD,)
    }

    #initializeUser(credentials) {
        this.id = credentials.id ; 
        this.firstName = credentials.firstName ; 
        this.lastName = credentials.lastName ; 
        this.email = credentials.email ; 
    }

    #createUser(credentials) {
        axios.post(API.V1 + V1.USER.ADD,credentials)
        .then((response) => {
            let credentials = response.data ; 
            this.#initializeUser(credentials) ; 
        }).catch((response) => {
            throw new Error(response.data.message); 
        })
    }

    constructor(id,existingCredentials) {
        if(typeof(id) === Object) { // User is being created for the first time
            let credentials = id ;
            let credentialsRequired = ['firstName','lastName','email'] ; 
            let credentialsProvided = Object.keys(credentials) ; 

            if(credentialsRequired.every((credential) => credentialsProvided.includes(credential))) {
                this.#createUser(credentials) ; 
            } else {
                throw new Error("You must provide all credentials") ; 
            }
        } else {
            this.#initializeUser(existingCredentials) ; 
        }
    }


}