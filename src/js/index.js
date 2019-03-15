// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/SearchView';
import {elements, renderLoader, clearLoader} from './views/base';
//import { stat } from 'fs';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state ={};

/** 
 * Search Controller
 * 
 */
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();//TODO
 // const query = 'pasta';
  //console.log(query);
  if(query) {
      // 2. New Search object and add to state
      state.search = new Search(query);

      // 3. Prepare UI for the results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);
      //4. Search for the recipes
      try {
      await state.search.getResults();

      //5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      }catch(err) {
        alert('Something went wrong with search');
        clearLoader();
      }
    }
}
elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

// TESTING 
/* window.addEventListener('load', e => {
  e.preventDefault();
  controlSearch();
}); */

elements.searchResPages.addEventListener('click', e => {
  const bttn = e.target.closest('.btn-inline');
  if(bttn){
    const goToPage = parseInt(bttn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
   // console.log(goToPage);
  }
});

/** 
 * Recipe Controller
 * 
 */
const controlRecipe = async () => {
   // Get ID from Url
   const id = window.location.hash.replace('#','');
   console.log(id);
   if(id) {
     //Prepare UI for changes

     //Create new recipe object
     state.recipe =  new Recipe(id);
     //TESTING 
    // window.r = state.recipe;
     //Get recipe data
     try {
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      //Calculate servings & time
      state.recipe.calcTime();
      state.recipe.calcServings();
 
      //Render recipe
      console.log(state.recipe);
     }
     catch (err) {
       alert('Error processing recipe!!');
     }
     
   }
};
//search.getResults();
/* const r = new Recipe(46956);
r.getRecipe();
console.log(r); */

/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load',controlRecipe); */
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));