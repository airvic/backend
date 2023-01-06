const express = require ('express');
const app = express()
const bodyparser = require ('body-parser');
const path = require ('path')
const EventEmitter = require ('events')
const eventEmitter = new EventEmitter()

const { MongoClient } = require('mongodb');
const JWT = require('jsonwebtoken');
const session = require ('express-session');
const dotenv = require ('dotenv')
const Mongodbsession = require ('connect-mongodb-session')(session);
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('62634991100848deba29ea48df84eccf');
const Post = require('./models/post.js')
const Politics = require('./models/politics.js');
const Fashion= require('./models/fashion.js');
const Celebrity = require('./models/celebrity.js')
const Affilate = require ('./models/affilate.js')
const Newsletter = require('./models/newsletter.js')
const Admin  = require('./models/admin.js')
const Sport = require('./models/sport.js')
const Message = require('./models/contactmessage.js')
const Traffic = require('./models/traffic.js')
const mongoose = require('mongoose');
const politics = require('./models/politics.js');
// const passport = require('passport')
const secretOrKey =  'secretbytheadminofbrivima';
app.use(express.static(path.join(__dirname,'public')));


app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended : true}))
dotenv.config()

  
//mongodb connection
mongoose.connect(process.env.uri,{ 
  useNewUrlParser: true,   
  useUnifiedTopology: true}).then(()=>{  
  console.log('mongodb successfully connected')
}).catch((error)=>{
  console.log("error "+error);
})




const store = new Mongodbsession({
  uri : process.env.uri,
  collection : 'admin panel session'
})


const oneday = 100 * 60 * 60 * 24;
app.use(session({
  secret:'adminpanelloginsessionbytheauthorairewamhevictor',
  saveUninitialized:false,
  cookie:{maxAge:oneday},
  resave:false,
  store:store
   
}
));


// app.use(passport.initialize())
// app.use(passport.session())

// const Passport = require ('./config/passport.js')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE');
    return res.status(200).json({})
  }
  next();
});


 
app.get('/endpoint',(req,res)=>{
  res.send("successful")
    
})

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html/'));
  })

app.post('/explore', async(req,res)=>{
  article = [];
  _id = req.body._id
  _title = req.body._title

  console.log(_id,_title)

  //  celebrity,politics,post,sport,fashion
  await Celebrity.find({}).then(celebrity =>{
    for(i = 0; i < celebrity.length; i += 1){
     if(celebrity[i]._id == _id){
      res.json(celebrity[i])
        
         break
     }else{
    //  console.log('not found in celebrity')
     }
   }
  }).catch(err => {
   console.log(err)
  })
  await Politics.find({}).then(politics =>{
    for(j = 0; j < politics.length; j += 1){
      if(politics[j]._id == _id){
        res.json(politics[j])
        
          break
      }else{
      // console.log('not found in politics')
      }
    }
  }).catch(err =>{

    console.log(err)
  })
  await Post.find({}).then(post =>{
    for(k = 0; k < post.length; k += 1){
      if(post[k]._id == _id){
        res.json(post[k])
          break
      }else{
      // console.log('not found in post')
      }
    }
  }).catch(err =>{
    console.log(err)
  })
 await  Sport.find({}).then(sport =>{
  for(l = 0; l < sport.length; l += 1){
    if(sport[l]._id == _id){
      res.json(sport[l])
      
        break
    }else{
    // console.log('not found in sport')
    }
  }
  }).catch(err =>{
    console.log(err)
  })
 await Fashion.find({}).then(fashion =>{
  for(m = 0;  m< fashion.length; m += 1){
    if(fashion[m]._id == _id){
      res.json(fashion[m])
        break
    }else{
    // console.log('not found in fashion')
    }
  }
  }).catch(err =>{
    console.log(err)
  })
 



// found = article.find(function(post,index){
//   if(post._id == _id){
//     console.log(true)

//   }else{
//     console.log(false)
//   }

// })







    
})


app.post('/savepost', async (req,res)=>{
  title = req.body.title;
  author = req.body.author;
  description = req.body.description;
  image1  = req.body.image1;
  image2  = req.body.image2;
  image3  = req.body.image3;
   category = req.body.category
  content = req.body.content;
  content2 = req.body.content2;
  content3 = req.body.content3;
 
   const post = new Post({title,author,description,image1,image2,image3,content,content2,content3,category})
   const result = await post.save().then(()=>{
    res.json(true)
  }).catch((error)=>{
    res.json(false)
  })
   

  //wait and send post response to the admin
  
   })

   app.post('/savecelebrity', async (req,res)=>{
    title = req.body.title;
    author = req.body.author;
    description = req.body.description;
    image1  = req.body.image1;
    image2  = req.body.image2;
    image3  = req.body.image3;
    content = req.body.content;
    content2 = req.body.content2;
    content3 = req.body.content3;
    category = req.body.category
     const celebrity = new Celebrity({title,author,description,image1,image2,image3,content,content2,content3,category})
     const result = await celebrity.save().then(()=>{
      res.json(true)
    }).catch((error)=>{
      res.json(false)
    })
     
  
    //wait and send post response to the admin
    
     })
     app.post('/savefashion', async (req,res)=>{
      title = req.body.title;
      author = req.body.author;
      description = req.body.description;
      image1  = req.body.image1;
      image2  = req.body.image2;
      image3  = req.body.image3;
      content = req.body.content;
      content2 = req.body.content2;
      content3 = req.body.content3;
      category = req.body.category
       const fashion  = new Fashion({title,author,description,image1,image2,image3,content,content2,content3,category})
       const result = await fashion.save().then(()=>{
        res.json(true)
      }).catch((error)=>{
        res.json(false)
      })
       
    
      //wait and send post response to the admin
      
       })
       app.post('/affilate', async (req,res)=>{
        link = req.body.link
         const affilate = new Affilate({link})
         const result = await affilate.save().then(()=>{
          res.json(true)
        }).catch((error)=>{
          res.json(false)
        })
         
      
        //wait and send post response to the admin
        
         })
       app.post('/newsletter', async (req,res)=>{
        lettername = req.body.personalname;
        letteremail = req.body.email;
         const newsletter  = new Newsletter({lettername,letteremail})
         const result = await newsletter.save().then(()=>{
          res.json(true)
        }).catch((error)=>{
          res.json(false)
        })
      })
       app.post('/savepolitics', async (req,res)=>{
        title = req.body.title;
        author = req.body.author;
        description = req.body.description;
        image1  = req.body.image1;
        image2  = req.body.image2;
        image3  = req.body.image3;
        content = req.body.content;
        content2 = req.body.content2;
        content3 = req.body.content3;
        category = req.body.category
         const politics = new Politics({title,author,description,image1,image2,image3,content,content2,content3,category})
         const result = await politics.save().then(()=>{
          res.json(true)
        }).catch((error)=>{
          res.json(false)
        })
         
      
        
        //wait and send post response to the admin
        
         })

         app.post('/savesport', async (req,res)=>{
          title = req.body.title;
          author = req.body.author;
          description = req.body.description;
          image1  = req.body.image1;
          image2  = req.body.image2;
           image3  = req.body.image3;
          content = req.body.content;
          content2 = req.body.content2;
          content3 = req.body.content3;
          category = req.body.category
           const sport = new Sport({title,author,description,image1,image2,image3,content,content2,content3,category})
           const result = await sport.save().then(()=>{
            res.json(true)
          }).catch((error)=>{
            res.json(false)
          })
           
        
          //wait and send post response to the admin
          
           })
   app.post('/getallpost',(req,res)=>{

    Post.find({}).then(articles =>{
     return  res.json(articles)
    }).catch(err => {
      res.json(false)
    })
    
    
     })

     app.post('/getnewsletter',(req,res)=>{
      Newsletter.find({}).then(newsletter =>{
        res.json(newsletter)
      }).catch(err => {
        res.json(false)
      })
      
      
       })
       app.post('/getaffilate',(req,res)=>{

        Affilate.find({}).then(affilate =>{
        return  res.json(affilate)
        }).catch(err => {
          res.json(false)
        })
        
        
         })
     app.post('/getallfashion',(req,res)=>{

      Fashion.find({}).then(articles =>{
      return  res.json(articles)
    
      }).catch(err => {
        res.json(false)
      })
      
      
       })
       app.post('/getallsport',(req,res)=>{
        console.log("route hitted")

        Sport.find({}).then(articles =>{
       return   res.json(articles)
        }).catch(err => {
          res.json(false)
        })
        
        
         })
         app.post('/getallpolitics',(req,res)=>{

          Politics.find({}).then(articles =>{
        return    res.json(articles)
          }).catch(err => {
            res.json(false)
          })
          
          
          
           })
           app.post('/getallcelebrity',(req,res)=>{

            Celebrity.find({}).then(articles =>{
              
           return   res.send(articles)
            }).catch(err => {
              res.json(false)
            })
            
            
             })
     app.post('/getgridfromdatabase',(req,res)=>{
        //these is the side for the database
      // Post.find({}).then(articles =>{
      //   res.json(articles)
      // }).catch(err => {

      //   res.json(false)
      // })
      
      
      
       })
   
     app.post('/getallmessages',(req,res)=>{
      Message.find({}).then(msg =>{
      return  res.json(msg)

      }).catch(err => {
      console.log(err)
      })

  

       })

       app.post('/deletemessage',(req,res)=>{
         const _id = req.id
         Message.findByIdAndRemove(_id).then(data =>{
           res.json(true)
         }).catch(()=>{
           res.json(false)
         })
        
         })
         app.post('/deletepost' , async (req,res)=>{
           title = req.body.title
           console.log(title)
         const result = await Post.deleteOne({title}).then(data =>{
            res.json(true)
          }).catch((error)=>{
            res.json(false)
          console.log('all post deleting error = ' +error)
          })
         
          })






app.post('/contactmessage', async (req,res)=>{
  console.log(req.body.name,req.body.email,req.body.message)
  Name = req.body.name;
  Email = req.body.email;
 const message = req.body.message;

  const msg = new Message({Name,Email,message})
  const newmsg = await msg.save().then(()=>{
    res.json(true)
    // console.log(newmsg)
    
  
  }).catch(err =>{
    console.log(err)
  res.json(false)

  })



  })


app.post('/login', async (req,res)=>{
username = req.body.Username
const newUsername = 'airvic'
if(username != newUsername){
  return res.json({
    success:false,
    msg:'invalid username'})
}else{
  Admin.find({username:req.body.Username},(err,user)=>{

    if(err){
      return res.json({
        success:false,
        msg:'an error occured'    })
    }else{
    if(password = user[0].password){
      const token = JWT.sign({username:username},secretOrKey,{
        expiresIn:'12h'
      })
      
      return res.json({
        success:true,
       token:token,
       user:user[0].username
      })
    }else{
     return res.json({
       success:false,
       msg:'invalid password'
     })
    }
     
    }
  })
  
  
  
}

})
 


// app.get('/isloggedin',(req,res)=>{
  

// })

// app.get('/loggout' ,async (req,res)=>{
//  await req.session.destroy()
//  if(req.session){
//    res.json(false)
//  }else{
//   res.json(true)
//  }
 
//  })

 app.post('/singlepagefromdatabase',(req,res)=>{
 _id = req.body._id
 

  Post.findById(_id).then(articles =>{
    res.json(articles)
    console.log(articles)
  }).catch(err => {
    res.json(false)
  })
 
})
app.post('/singlecelebrity',(req,res)=>{
_id = req.body._id
  
  Celebrity.findById(_id).then(articles =>{
    res.json(articles)
    console.log(articles)
  }).catch(err => {
    res.json(false)
  })
 
})

app.post('/singlesport',(req,res)=>{
_id = req.body._id
  Sport.findById(_id).then(articles =>{
    res.json(articles)
    console.log(articles)
  }).catch(err => {
    res.json(false)
  })


})



const port = process.env.PORT || 8080;
app.listen(port ,()=>{
    console.log("server on port: "+ port);
})