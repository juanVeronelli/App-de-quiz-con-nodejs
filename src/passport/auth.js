const passport = require('passport');
const strategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done) =>{
    const user = await User.findById(id);
    done(null, user);
})

passport.use('local-signup', new strategy({
    usernameField: 'email' ,
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const asa = await User.findOne({email: email});
    if(asa){
        return done(null, false, req.flash('Message', 'Email has already been register, please take another'))
    } else {
        const user = new User();
        user.email = email;
        user.password = password
        await user.save();
        done(null, user);
    }
}))

passport.use('local-singin', new strategy({
    usernameField: 'email',
    passwordField:'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const asa = await User.findOne({email: email});
    if(!asa){
        return done(null, false, req.flash('MessageErr', 'Not user found'))
    }
    if(!asa.compare(password)){
        return done(null, false, req.flash('MessageErr', 'Incorrect Password'))
    }
    done(null, asa);
}))