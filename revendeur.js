const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
var mysql=require('mysql');
  var connection=require('./server');
 // const app=require('./server');

 
const Bcrypt = require("bcryptjs");
var bcrypt = require("bcrypt")
var app = express();
app.set('superSecret', 'blogangularnodejs');

const con=require('./connect')

/*

  const apiRoot ='/revendeur'

  app.use(bodyParser.urlencoded({extended: true}));

   app.use(cors ({

    origin : /http:\/\/localhost/
  }));

  app.options('*', cors());



//configure routes 
const router = express.Router();*/

//afficher tous les revendeurs
app.get('/Allrevendeur' , (req,res)=>{

    sql="SELECT * FROM revendeur";

    con.query(sql, (err , rows , fields)=> {

       
      if(!err) {
        console.log("rows "+ JSON.stringify(rows));
        res.end(JSON.stringify(rows)); 
      
      }
          else
          console.log("Err"+error);
    
        })
});

//afficher un revendeur


app.get('/AuthentificationRevendeur' , (req,res)=> {
  var  email ;
  var password ;
 // password="tunis";
 // email ="radhwa@yahoo.fr",
  email=req.body;
  password=req.body;

  con.query("SELECT *  FROM revendeur WHERE emailRevendeur= '"+email+"' AND motDePasseRevendeur='"+password+"' " , [email,password] ,function (error, result ,rows) {

         console.log("result",result.length  , result);  
      
         
        if(result.length >0) {            
          
         console.log("cet email existe  déja " + result.length + " fois");   
         res.end(JSON.stringify(result));


          if(result[0].motDePasseRevendeur==password)
               {console.log("le mot de passe et email sont valide ,Authentification acceptée")}

          else console.log("Authentification est echoué , merci de verifier votre mot de passe")
                             }

         else      
            console.log("Votre email est enregistrer , Veuillez entrer votre mot de passe"); 
         })


  
        }); 

app.get('/afficherRevendeur' , (req,res) => {
         
    sql="SELECT * From revendeur WHERE emailRevendeur=?" 
    email=req.body;
   //email="hossniAli@yahoo.com"

    con.query(sql , [email] , (err,rows,fields) =>{

            
        if(!err) {
          console.log("rows "+ JSON.stringify(rows));
          res.end(JSON.stringify(rows)); 
        
        }
            else
            console.log("Err"+error);
        })

 });

 //ajouter un revendeur
app.post('/ajouterRevendeur' , (req,res)=> {
  

  
//let rev=req.body;
console.log ("body revendeur"  , req.body)
var sql="INSERT INTO  revendeur(nomRevendeur,prenomRevendeur,emailRevendeur, cinRevendeur,telephoneRevendeur,motDePasseRevendeur,adresseRevendeur,idCommercial) \
VALUES ( '"+req.body.nom+"' , '"+req.body.Prenom+"' , '"+req.body.email+"' ,  '"+req.body.cin+"','"+req.body.telephone+"' ,'"+req.body.adresse+"' ,'"+req.body.password+"' , 14)  "


  con.query(sql, null ,function (err, result , fields) {

      
          if(!err) {
            console.log("rows "+ JSON.stringify(result));
            res.end(JSON.stringify(result)); 
      }
              else if(result.emailRevendeur=rev.emailRevendeur)
               console.log('cette email existe deja' )
             })
  
  

});


//Update Revendeur

app.put('/modifierRevendeur/:id' , (req,res)=> {

  var rev=req.body;
   var sql = "UPDATE revendeur SET cinRevendeur='"+rev.cinRevendeur+"' , nomRevendeur='"+rev.nomRevendeur+"' , prenomRevendeur='"+rev.prenomRevendeur+"' , emailRevendeur='"+rev.emailRevendeur+"' , telephoneRevendeur='"+rev.telephoneRevendeur+"' , motDePasseRevendeur='"+rev.motDePasseRevendeur+"' , adresseRevendeur='"+rev.adresseRevendeur+"' ,  idCommercial='"+rev.idCommercial+"'\
   Where idRevendeur='"+rev.idRevendeur+"'"
    
  con.query(sql, [rev.idRevendeur , rev.cinRevendeur , rev.nomRevendeur , rev.prenomRevendeur , rev.emailRevendeur , rev.telephoneRevendeur , rev.motDePasseRevendeur , rev.adresseRevendeur , rev.idSociete ],  (err, rows , fields) =>{
      
    if(!err) {
      console.log("rows "+ JSON.stringify(rows));
      res.end(JSON.stringify(rows)); 
    
    }
        else
        console.log("Err"+err);
  })
  
  
  
  
   })

//supprimer un revendeur

app.delete('/supprimerRevendeur/:id' , (req,res)=> {


var sql="DELETE  FROM revendeur WHERE idRevendeur= ?" 



con.query(sql, [req.params.id],  (err, rows , fields) =>{
  
      if(!err) {
        console.log("rows "+ JSON.stringify(rows));
        res.end(JSON.stringify(rows)); 
      
      }
          else
          console.log("Err"+err);
})



});

module.exports = app;