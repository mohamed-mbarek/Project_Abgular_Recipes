import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterseptorService implements HttpInterceptor{

 constructor(private authServise:AuthService){}
 
 intercept(req:HttpRequest<any>,next:HttpHandler){
   
    return this.authServise.user.pipe(
    take(1),
    exhaustMap(user=>{
        if(!user){
            return next.handle(req);
        }
        const modifiedReq=req.clone({
            params:new HttpParams().set('auth',user.token)
         });
        return next.handle(modifiedReq);

     })
    );
 }

}