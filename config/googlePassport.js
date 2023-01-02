const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")

const googleStrategy = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID:"710370975315-mav4gciusc1svgs397h782f7f9h82j4g.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"http://localhost:9090/oauth/callback"
        },async(accessToken, refreshToken, profile, done)=>{
            const newUser = {
                googleId:profile.id,
                firstname:profile.name.givenName,
                lastname:profile.name.familyName,
                image:profile.photos[0].value
            }
            try{
                let user = await User.findOne({googleId:profile.id})
                if(user){
                    done(null,user)
                }
                else{
                    user = await User.create(newUser)
                    done(null,user)
                }
            }catch(err){
                console.log(err)
            }
            
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      })
}

module.exports = googleStrategy