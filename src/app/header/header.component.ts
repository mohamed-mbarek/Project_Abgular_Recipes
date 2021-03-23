import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit ,OnDestroy {
  
  isAuthentificated=false;
  private userSub:Subscription;
    constructor(private dataStorageService:DataStorageService ,private authService:AuthService){}
 
  
    onLogout(){
      this.authService.logout();
    }
  
  
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
  
  ngOnInit() {
 this.userSub= this.authService.user.subscribe(user=>{
   this.isAuthentificated=!!user;
   console.log(!user);
   console.log(!!user);
 });  
  }
 
    onSaveData(){
      this.dataStorageService.storeRecipe();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
 
}
