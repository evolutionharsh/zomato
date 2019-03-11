// Global app controller
import axios from 'axios';

async function getresults(query){
   const proxy = 'https://cors-anywhere.herokuapp.com/';
   const key = 'd5582bf9629e11a649819a5b4d084cd1';
   try {
    const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
   } catch(error) {
       alert(error);
   }
   
}
getresults('pizza');
//https://www.food2fork.com/api/search
//d5582bf9629e11a649819a5b4d084cd1 

