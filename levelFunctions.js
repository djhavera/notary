
const level = require('level'); 
const chainDB = './chaindata98'; // storage location of dataset
const db = level(chainDB); //This will create or open the underlying LevelDB store.
const Block = require('./blockClass'); 

function addBlock(key, value){ 
  return new Promise((resolve, reject) => { 
    db.put(key, value, (err) => {
       if (err) reject(err); 
    resolve(key, value); 
    console.log('Added block #' + key) }); }); }

function getBlock (key) { 
  return new Promise((resolve, reject) => { 
    db.get(key, (err, value) => { 
      if (err) {
        if (err.notFound) {
        return console.log("NotFoundError (Please Enter a Valid Height)")
      }
      // I/O or other error
        return callback(err)
      }
    //console.log(value)
    resolve(JSON.parse(value)); }); }); }


function getBlockHeight() { 
  return new Promise((resolve, reject) => { 
    let height = -1; 
    db.createReadStream().on('data', (data) => { 
      //console.log('Get Block Height ' + data.key); 
      height++; 
    }).on('error', (err) => { 
        reject(err); 
      }).on('close', () => { 
        //console.log('Block Chain Height ' + height)
        resolve(height); }); }); }
    
module.exports = { getBlock, getBlockHeight, addBlock};
