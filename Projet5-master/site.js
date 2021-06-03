const express = require('express');
const router = express.Router();
const path = require('path');
/*const teddyCtrl = require('../controllers/teddy');*/


router.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/site/index.html'));
});
router.get('/style.css', function(request, response){
    response.sendFile(path.join(__dirname+'/site/style.css'));
});
router.get('/panier.html', function(request, response){
    response.sendFile(path.join(__dirname+'/site/panier.html'));
});
router.get('/produit.html', function(request, response){
    response.sendFile(path.join(__dirname+'/site/produit.html'));
});
router.get('/confirmtion.html', function(request, response){
    response.sendFile(path.join(__dirname+'/site/confirmation.html'));
});


module.exports = router;