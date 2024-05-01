const bcrypt =  require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users');


const signup = (req,res)=>{
    res.render('signup',{message: null});
   }

const loginPage = (req,res)=>{
    res.render('login', {message: null} );
   }   

const register =  async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(password);
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.render('signup',{
                message: "User already present in DB. Please try again"
            })
        }
        console.log('one');
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)
        const newUser = new Users({ name, email, password: hashPassword });
        newUser.save().then(response => {
            res.render('login', {
                message: "User created successfully. Please login."
            });
        }).catch(err => {
            console.error("Error in saving new user:", err);
            res.render('signup', {
                message: "Error in user creation. Please try again."
            });
        });

        
        
    } catch (error) {
        res.render('signup',{
            message: "error final server error last"
        })
    }
}

const login = async (req,res)=>{
    try{
      const {email, password} =  req.body;
      const existingUser =  await Users.findOne({email});
      if(!existingUser){
          return res.render('login',{
              message: "User is not in DB. Please try again another credentials"
          })
      }
      const passwordMatch =  await bcrypt.compare(password,existingUser.password);
      if(passwordMatch){
          return res.render('home',{
              message: null
          })
      }else{
          return res.render('login',{
              message: "password error"
          })
      }
  
    }catch(err){
      res.render('login',{
          message: "error final server error last login"
      })
    }
  }

   module.exports = {
    signup,
    loginPage,
    register,
    login
   }