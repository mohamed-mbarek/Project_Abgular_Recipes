import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    kind:string,
    email:string,
    idToken:string,
    refreshToken:string,
    expireIn:string,
    localId:string,
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user =new BehaviorSubject<User>(null);
    private time:any;
constructor(private http:HttpClient,private router:Router){}

singnup(email:string,password:string){
   return this.http.post<AuthResponseData>(
       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA1cyv-9T3WCJm9e7I2eL7yRL0t89M4yTU',
       {
           email:email,
           password:password,
           returnSecureToken:true
       }

    ).pipe(
        catchError(this.handleError),
        tap(resData=>{
            this.handleAuthentification(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expireIn 
            );
        })
    );
}
logoin(email:string,password:string){
    return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyA1cyv-9T3WCJm9e7I2eL7yRL0t89M4yTU',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }   
        ).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expireIn 
                    );
                }));

}

autoLogin(){
    const userData:{
        email:string,
        id:string,
        _token:string ,
        _tokenExpirationData:string;
    }=JSON.parse( localStorage.getItem('userData'));
    if(!userData){
        return;
    }
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationData));
    if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration=new Date (userData._tokenExpirationData).getTime()-new Date().getTime();
        this.autoLogout(expirationDuration);
    }
}

logout(){
    this.user.next(null);
    this.router.navigate(['/auth']); 
    localStorage.removeItem('userData');
    if(this.time){
        clearTimeout(this.time);
    }
    this.time=null;
}

autoLogout( expirationDuration:number){
   console.log(expirationDuration);
    this.time= setTimeout(()=>{
        this.logout();
    },expirationDuration)
}

private handleAuthentification(email:string,userId:string, token:string, expireIn:number){
        const expirationDate=new Date(
        new Date().getTime() + expireIn *1000
        );
        const user=new User(
        email,
        userId,
        token,
        expirationDate
        );
        this.user.next(user);
        this.autoLogout(expireIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }   


private handleError(errorRes:HttpErrorResponse){
    let errorMessage='An unknown error occurred !';
    if(!errorRes.error ||!errorRes.error.error ){
        return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage='This email exists a ready .';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage='this Email does not exist. ';
            break;
        case 'INVALID_PASSWORD':
            errorMessage='this password is not correct .';
            break;
    }
    return throwError(errorMessage);
} 
}