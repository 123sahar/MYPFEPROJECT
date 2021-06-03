import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  InscriptionForm;
  LoginForm;
  
  
  
  constructor(
    public NavCtrl : NavController ,
   private  http:HttpClient ,

  ) {
    
   }

AddCommercial (user ){
  console.log("user",user);
  return this.http.post<any>("http://localhost:1718/ajouterCommercial" , user)

}

AddRevendeur (user ){
  console.log("user",user);
  return this.http.post<any>("http://localhost:1718/ajouterRevendeur" , user)

}

AddCommercialList (){

  return this.http.get<any>("http://localhost:1718/listeCommercial");
 
}


AddSocieteList ( ){

  return this.http.get<any>("http://localhost:1718/listeSociete");
  
}


/*

  setLoginForm (form1) {
    this.LoginForm=form1;
  
  }
  
  
  getLoginForm () {
    return (this.LoginForm);
  
  }
  */
  
/*
  public AddRevendeur (form1) {
 

  console.log("Service ", form1);

 
}*/

LoginCommercial (){
 // console.log("personne : ",personne);
  return this.http.get('http://localhost:1718/AuthentificationCommercial' )

}

LoginRevendeur (LoginForm){

  return this.http.get('http://localhost:1718/AuthentificationRevendeur',LoginForm);

}

getCommercialByIdSociete (idS){  
  console.log('idS',idS);
    return this.http.get('http://localhost:1718/getComlByIdSociete' ,idS )
}


private extractData(res : Response) {
  let body=res;
  return body || { };
}

getComData () {
  return this.http.get('http://localhost:1718/afficherCommercialData')
  

}
}