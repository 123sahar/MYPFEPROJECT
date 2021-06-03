var express = require('express');
var app = express();

app.set('superSecret', 'blogangularnodejs');

const con=require('./connect')

//var email='hossniAli@yahoo.com';
//var password='aliHossni45';
 /*
app.get('/commercialTest' , function (req,res) {
  var sql = "select * from revendeur  where emailRevendeur =? and  motDePasseRevendeur=?";


  con.query(sql,  [email , password ], function(err,result)  {
    if(result)
        {
        return console.log("Bienvenue dans notre application " , result)}


        else 
        
        return console.log("Vérifier votre email  ");
});

});*/

//afficher tous les commerciaux
app.get('/AllCommercial' , function (req,res) {

    sql="SELECT * FROM commercial";
    console.log(sql);

    con.query('SELECT * FROM commercial',function (err , rows ) {
      if(!err) {
        console.log("rows "+ JSON.stringify(rows));    
        
        res.end(JSON.stringify(rows));       
      }
          else
          console.log("Err"+error);
    
    
        });
});

app.get('/listeCommercial' , function (req,res) {

// idS= this.Commerciaux.AjouterListeDesCommerciaux();
//console.log(idS)

//SELECT * FROM Livres, categorie WHERE Livres.idCat = categorie.idCat; 
 
    con.query("SELECT * FROM commercial , societe WHERE commercial.idSociete = societe.idSociete ",function (err , rows ) {
      if(!err) {
        console.log("rows "+ JSON.stringify(rows));    
        
        res.end(JSON.stringify(rows));       
      }
          else
          console.log("Err"+error);
    
    
        });
});
/*
app.post('/api/addUserr', (req, res) => {
  console.log(req.body.id_societe);
   connection.query('INSERT INTO ' ,
   function(error ,rows){
   if (error){
   console.log("Err"+error);
   }else {
   console.log("rows "+ JSON.stringify(rows));
   res.end(JSON.stringify(rows)); }
   });
  
  });*/
   
//Authentification commercial
app.get('/AuthentificationComercial' , (req,res)=> {
  var  email ;
  var password ;
  
  email=req.body.emailCommercial;
  password=req.body.motDePasseCommercial;
  console.log('body', email);

  con.query("SELECT * FROM commercial WHERE emailCommercial='"+email+"' AND motDePasseCommercial='"+password+"' " , [email,password] , function (error, result ,rows) {

        console.log("result", result.length , result);  
      
         
        if(result.length >0) {            
          
         console.log(" Email valide car il existe  déja " + result.length + " fois");   
         
         res.end(JSON.stringify(result));


          if(result[0].motDePasseCommercial==password)
               {console.log("le mot de passe et email sont valide ,Authentification acceptée")}

          else console.log("Authentification est echoué , merci de verifier votre mot de passe")
                             }

         else      
            console.log("Votre email ou mot de passe sont invalide  , Vous n'avez pas encore un compte?"); 
         })


  
        }); 


  

//afficher un commercial

app.get('/afficherCommercial' , (req,res) => {

 // email=req.body;
    email="mariem@yahoo.com"     
    sql="SELECT * From commercial  where emailCommercial=?" 

        con.query(sql ,[email] , (err,rows,fields) =>{

          if(!err) {
            console.log("rows "+ JSON.stringify(rows));
            res.end(JSON.stringify(rows)); 
          
          }
              else
              console.log("Err"+error);
        })

 });

 //ajouter un commercial


 app.post('/ajouterCommercial' , (req,res)=> {
  let com=req.body;
  console.log("body", req.body);
  let idS=req.params.id;
  
  var sql="INSERT INTO  commercial(nomCommercial,prenomCommercial,emailCommercial,cinCommercial,telephoneCommercial,adresseCommercial,motDePasseCommercial,idSociete) \
    VALUES ( '"+com.nom+"' , '"+com.Prenom+"' , '"+com.email+"' ,  '"+com.cin+"','"+com.telephone+"' ,'"+com.adresse+"' ,'"+com.password+"' , '"+com.idSociete+"')  "
  
 // var personne =[com.idCommercial , com.cinCommercial , com.nomCommercial , com.prenomCommercial , com.emailCommercial , com.telephoneCommercial , com.motDePasseCommercial , com.adresseCommercial , com.idSociete]

    con.query(sql, null ,function (err, result ,rows) {

  //   console.log("result" , result); 
            if(!err) {
              console.log("rows "+ JSON.stringify(result));
              console.log(result)
           //   res.end(JSON.stringify(result));
           
                               } 

             else {console.log("cette email existe déja" , err)}
 
             

});
 
 })
//Update commercial

app.put('/modifierCommercial/:id' , (req,res)=> {

var com=req.body;
 var sql = "UPDATE commercial SET cinCommercial='"+com.cinCommercial+"' , nomCommercial='"+com.nomCommercial+"' , prenomCommercial='"+com.prenomCommercial+"' , emailCommercial='"+com.emailCommercial+"' , telephoneCommercial='"+com.telephoneCommercial+"' , motDePasseCommercial='"+com.motDePasseCommercial+"' , adresseCommercial='"+com.adresseCommercial+"' ,  idSociete='"+com.idSociete+"'\
 Where idCommercial='"+com.idCommercial+"'"
  
con.query(sql, [com.idCommercial , com.cinCommercial , com.nomCommercial , com.prenomCommercial , com.emailCommercial , com.telephoneCommercial , com.motDePasseCommercial , com.adresseCommercial , com.idSociete ],  (err, rows , fields) =>{
    
  if(!err) {
    console.log("rows "+ JSON.stringify(rows));
    res.end(JSON.stringify(rows)); 
  
  }
      else
      console.log("Err"+err);
})




 })

//supprimer un commercial

app.delete('/supprimerCommercial/:id' , (req,res)=> {

 // var idpersonne=req.params.id;
var sql="DELETE  FROM commercial WHERE idCommercial= ?" 



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