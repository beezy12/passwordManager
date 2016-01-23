// this module uses the crypto-js (https://www.npmjs.com/package/crypto-js)
// and allows a user to create an encrypted message that can only be deciphered with a secretKey


var crypto = require('crypto-js');

var secretMessage = 'I hid the chips under the couch';
var secretKey = '123abc';


// ENCRYPT MESSAGE
// AES is one of many encryption algorithms
// encrypt takes two arguments: a message, and a key
var encryptedMessage = crypto.AES.encrypt(secretMessage, secretKey);
console.log("encrypted message: " + encryptedMessage);

//DECRYPT MESSAGE
// notice using decrypt here, but encrypt above
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);

// to turn it back into english
var decryptedMessage = bytes.toString(crypto.enc.Utf8);
console.log("Decrypted Message: " + decryptedMessage);

/***************************************************************************************************************/


// CHALLENGE: TURNED SECRET MESSAGE INTO AN OBJECT, AND SECRETMESSAGE DOESN'T KNOW HOW TO WORK WITH OBJECTS....ONLY
// STRINGS. ALSO, decrypt is only going to return a string ('the bytes.toString part')....it doesn't know how to
// take that string and turn it back into an object. Gotta use JSON.parse and JSON.stringify
// stringify turns an object into a string. parse turns a string into an object.

var crypto = require('crypto-js');

var secretMessage = {
	name: 'brian',
	secretName: 'beezy'
};
var secretKey = '123abc';


// ENCRYPT MESSAGE
// AES is one of many encryption algorithms
// encrypt takes two arguments: a message, and a key
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
console.log("encrypted message: " + encryptedMessage);

//DECRYPT MESSAGE
// notice using decrypt here, but encrypt above
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);

// to turn it back into english
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));
console.log(decryptedMessage);
console.log(decryptedMessage.secretName);







