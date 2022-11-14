const express = require('express');
const passport = require('passport');
const routes = (server) =>{
    //LOGIN
    server.get('/', (req, res)=>{
        res.render('index') 
    })

    server.post('/login', passport.authenticate('local-singin', {
        successRedirect: '/levels',
        failureRedirect: '/',
        passReqToCallback: true
    }))

    // SIGNUP
    server.get('/signup', (req, res)=>{
        res.render('register')
    })

    server.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        passReqToCallback: true
    }))

    //Seleccion de niveles
    server.get('/levels', (req, res)=>{
        res.render('levels')
    })

};

module.exports = routes;