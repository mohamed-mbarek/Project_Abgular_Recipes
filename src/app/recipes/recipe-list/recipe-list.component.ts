import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 recipes:Recipe[]=[
   new Recipe(' A test Recipe','This is a simply a test ','https://vilas.extension.wisc.edu/files/2013/12/Recipes-Title-300x256.png'),
   new Recipe(' A test Recipe','This is a simply a test ','https://vilas.extension.wisc.edu/files/2013/12/Recipes-Title-300x256.png')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
