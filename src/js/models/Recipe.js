import axios from 'axios';
import {key,proxy} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
       try {
          const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&Id=${this.id}`);
          this.title = res.data.recipe.title;
          this.author = res.data.recipe.publisher;
          this.img = res.data.recipe.image_url;
          this.url = res.data.recipe.source_url;
          this.ingredients = res.data.recipe.ingredients;
          //console.log(res);
       }catch(error) {
           console.log(error); 
           alert('Something went wrong :(');
       }
    }

    calcTime() {
        // assuming that we need 15 min for each 3 ingredients
        const ingrd = this.ingredients.length;
        const periods = Math.ceil(ingrd/3);
        this.time = periods*15;
    }
    calcServings() {
        this.servings = 4;
    }
}