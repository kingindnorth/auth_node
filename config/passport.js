const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs")

const User = require("../models/User")

module.exports = (passport)=>{
    passport.use(
        new LocalStrategy({usernameField:"email"}, async(email,password,done)=>{
            //find user
            const user = await User.findOne({email})
            if(!user) return done(null,false,{ message:"you are not registered,please register!" })
            //match password
            const isPasswordCorrect = await bcrypt.compare(password,user.password)
            if(!isPasswordCorrect) return done(null,false,{ message:"you entered a wrong password" })
            done(null,user)
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}

