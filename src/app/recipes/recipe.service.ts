import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
  recipesChanged=new Subject<Recipe[]>();   
    // private  recipes: Recipe[] = [ 
    //     new Recipe('Curry de poulet au fromage blanc ',
    //              'A super-tasty !',
    //               'https://d2qr63i3uw2hd1.cloudfront.net/recipe_photos/slide/196530/Curry-de-poulet-au-fromage-blanc-0.jpg'
    //               ,[ 
    //                   new Ingredient('Meat',1),
    //                   new Ingredient('French Fries',20)
                      
    //                 ]),
    //     new Recipe('Salade de riz au thon et aux œufs',
    //                'what else  you need to say ?',
    //               'https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/3C314998-6DDC-4EAD-9AEB-F512AA7668F1/Derivates/0f082e3b-221a-4a23-93d0-b8b5a4a2daac.jpg'
    //               ,[
    //                 new Ingredient('Buns ',2),
    //                 new Ingredient('Meat ',1 )
    //               ])

    //   ];
    private recipes:Recipe[]=[];
        constructor(private slService:ShoppingListService){}
        
        setRecipes(recipes:Recipe[]){
          this.recipes=recipes;
          this.recipesChanged.next(this.recipes.slice());
        }

        getRecipe(){
          return this.recipes.slice();
      }
      getRecipes(index:number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients:Ingredient[]){
            this.slService.addIngredients(ingredients);  
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number ,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}