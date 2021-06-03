 const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
   var mysql=require('mysql');
  const connection=require('./server');

const Bcrypt = require("bcryptjs");
var bcrypt = require("bcrypt")
var app = express();
app.set('superSecret', 'blogangularnodejs');

const con=require('./connect')


app.get('/AuthentificationSociete' , (req,res)=> {
  var  login ;
  var password ;
 
  con.query("SELECT *  FROM societe WHERE loginSociete= '"+login+"'", function (error, result ,rows) {

         console.log("result", result.length , result);  

        if(result.length >0) {            
          
         console.log("cet login existe  déja " + result.length + " fois");   
         res.end(JSON.stringify(result));
          if(result[0].motDePasseSociete==password)
               {console.log("le mot de passe et login sont valide ,Authentification acceptée")}

          else console.log("Authentification est echoué , merci de verifier votre mot de passe")
           }
         else      
            console.log("Votre login est enregistrer , Veuillez entrer votre mot de passe"); 
         })
        }); 

         app.get('/listeSociete' , function (req,res) {
         
           con.query("SELECT * FROM societe " ,function (err , rows ) {
             if(!err) {
               console.log("rows "+ JSON.stringify(rows));    
               
               res.end(JSON.stringify(rows));       
             }
                 else
                 console.log("Err"+error);
           
           
               });
         });

//afficher tous les societe
app.get('/societe' , (req,res)=>{

    sql="SELECT * FROM societe";

    connection.query(sql, (err , rows , fields)=> {

      
      if(!err) {
        console.log("rows "+ JSON.stringify(rows));
        res.end(JSON.stringify(rows)); 
      
      }
          else
          console.log("Err"+error);
    
        })
});

//afficher un societe

app.get('/afficherSociete' , (req,res) => {

  nom=req.body;
         
    sql="SELECT * From societe WHERE nomSociete=?" 
     connection.query(sql ,[nom] , (err,rows,fields) =>{
    
        if(!err) {
          console.log("rows "+ JSON.stringify(rows));
          res.end(JSON.stringify(rows)); 
        }
       else
            console.log("Err"+error);
        })
 });


 //ajouter un Societe


 app.post('/ajouterSociete' , (req,res)=> {
  var societe=req.body;
    var sql="INSERT INTO  societe(nomSociete,loginSociete,telephoneSociete,adresseSociete,motDePasseSociete) \
    VALUES ( '"+societe.nom+"' , '"+societe.login+"' ,'"+societe.telephone+"' ,'"+societe.adresse+"', '"+societe.motDePasse+"' )  "
    connection.query(sql, societe, function (err, result , fields) {
        
            if(!err) {
              console.log("rows "+ JSON.stringify(rows));
              res.end(JSON.stringify(rows)); 
            }
                else
                console.log("Err"+error);
      })
});


//Update Societe

//supprimer un Societe

app.delete('/supprimerSociete' , (req,res)=> {

  var idsocity=req.body;
var sql="DELETE  FROM societe WHERE idSociete= ?" 



connection.query(sql, [idsocity], function (err, result , fields) {
    
        if(!err) {
          console.log("rows "+ JSON.stringify(rows));
          res.end(JSON.stringify(rows)); 
        
        }
            else
            console.log("Err"+error);
     
  })



});


module.exports = app;