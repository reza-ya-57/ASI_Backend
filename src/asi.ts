import server from './server';



const port = (process.env.PORT || 5000);

    // Node.js program to demonstrate the
// crypto.generateKeyPairSync() method
  
// // Including generateKeyPairSync from crypto module
// const { generateKeyPairSync } = require('crypto');
  
// // Including publicKey and  privateKey from 
// // generateKeyPairSync() method with its 
// // parameters
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//   modulusLength: 570,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'der'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'der'
//   }
// });
  
// // Prints asymmetric key pair after encoding
// console.log("The public key is: ", 
//          publicKey.toString('base64'));
// console.log();
// console.log("The private key is: ",
//          privateKey.toString('base64'));


server.listen(port , () => {
    console.log(`listening on port ${port}`)
})