import axios from 'axios';
import {key,proxy} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(){
        
        try {
         const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
         this.result = res.data.recipes;
         //console.log(this.result);
        } catch(error) {
            alert(error);
        }
        
     }
}



//https://www.food2fork.com/api/search
//d5582bf9629e11a649819a5b4d084cd1 