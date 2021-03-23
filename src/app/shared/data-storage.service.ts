    import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AuthService } from "../auth/auth.service";
@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http:HttpClient ,private recipeService:RecipeService,private authService :AuthService){
}
    storeRecipe(){
        const recipes=this.recipeService.getRecipe();
        return this.http.put('https://recipe-book-3932c-default-rtdb.firebaseio.com/recipes.json',
        recipes
        )
        .subscribe(reponse=>{
            console.log(reponse);
        });
    }

    fetchRecipes(){
      
        return this.http.get<Recipe[]>('https://recipe-book-3932c-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipes=>{
            return recipes.map(recipe=>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients:[]};
            });
            }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
     
