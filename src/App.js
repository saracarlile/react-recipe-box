import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeList from './RecipeList';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  

  //initial data
  recipes = [
    {id: 1, title: 'Hot Oatmeal', content: 'quaker oats, hot water, honey, ground cinnamon'},
    {id: 2, title: 'Beef Tacos', content: 'Ground beef, shredded cheese, taco shells, lettuce, hot sauce'}
  ];


  getRecordsFromLocalStorage = () => {
    let recs = localStorage.getItem('recipeList');
    let recsParsed = JSON.parse(recs);
    return recsParsed;
  }

  //loads initial data into local storage and set receipes in state when you first load page if you have no records in local storage against 'recipeList'

  componentDidMount = () => {
    
    let currentRecipes = localStorage.getItem('recipeList');
    if ((currentRecipes !== undefined) || (currentRecipes !== "undefined") || (currentRecipes != null)) {  // https://stackoverflow.com/questions/6295665/checking-undefined-value-not-working
      this.setState({ recipes: this.getRecordsFromLocalStorage()});  //if currentRecipes key already exists in localStorage
    }   
    if((currentRecipes == undefined) || (currentRecipes == "undefined") || (currentRecipes == null)) {
      localStorage.setItem('recipeList', JSON.stringify(this.recipes));  //if currentRecipes doesn't exist in localStorage, use test initial data
      this.setState({ recipes: this.getRecordsFromLocalStorage()}); 
    }
  }

  // find currentReceipe in this.state.recipes, return undefined if not found 

  findIndex = (id) => {
    for (let i = 0; i < this.state.recipes.length; i++) {
      if (this.state.recipes[i].id == id) return i;
    }
    return undefined;
  }

//https://stackoverflow.com/questions/41454747/change-state-in-parent-component-from-child-then-pass-that-state-as-property-an
//need to communicate with top-level App.js through this function to update this.recipes on state

  handleSave = (currentRecipe) => { 
      let recipes = this.state.recipes;
      let index = this.findIndex(currentRecipe.id);
      if (index != undefined) {
        recipes[index] = currentRecipe;
      }
      if (index == undefined){
        recipes.push(currentRecipe);
      }
      this.setState({recipes: recipes});
      localStorage.setItem('recipeList', JSON.stringify(this.state.recipes));
    }

    handleDelete = (recipe, e) => { 
      let recipes = this.state.recipes;
      let index = this.findIndex(recipe.id);
      recipes.splice(index, 1);
      localStorage.setItem('recipeList', JSON.stringify(recipes));
      this.setState({recipes: recipes});
    }



  render() {
  

    return (
      <div>
        <div className="container push-down">
          <h2 className="text-center">Recipe List</h2>
          <RecipeList recipes={this.state.recipes} handleSave={this.handleSave.bind(this)} handleDelete={this.handleDelete.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
