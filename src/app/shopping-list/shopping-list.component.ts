import { Component, OnInit } from '@angular/core';
import { Incredient } from '../shared/incredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients :Incredient[]=[
  new Incredient('Apples',5),
  new Incredient('Tomatoes',10)
];
  constructor() { }

  ngOnInit(): void {
  }

}
