import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({  
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
 @ViewChild('f',{static:false})slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editItem:Ingredient;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  this.subscription=this.slService.startedEditing
  .subscribe(
    (index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editItem=this.slService.getIngredient(index);
      this.slForm.setValue({
        name:this.editItem.name,
        amount:this.editItem.amount
      })
    }
  );
  }

  onAddItem(form:NgForm) {
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
   if(this.editMode){
     this.slService.updateIngredient(this.editedItemIndex,newIngredient)
   }else{
    this.slService.addIngredient(newIngredient);
   }
   this.editMode=false; 
   form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false ;
  }
  onDelet(){
    this.slService.onDeleteIngredient(this.editedItemIndex);
    this.onClear();
  }
 ngOnDestroy(){
   this.subscription.unsubscribe();
 }


}
