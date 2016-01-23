// this module shows some examples of creating an object that you can turn into a json object using
// json.parse, and back again using json.stringify.
// note that json objects are really just strings.....hence to turn an object into a json object you use stringify



var person = {
	name: "brian",
	age: 36
};

// this is how you convert an object into JSON
// JSON on the right side is an object, and stringify is a method on the JSON object that turns
// whatever you put as it's argument, into a JSON.
var personJSON = JSON.stringify(person);
console.log(personJSON);
console.log(typeof personJSON);






//to turn a JSON back into a javascript object

// parse takes the JSON string and converts it into a javascript object
var personObject = JSON.parse(personJSON)

console.log(personObject.name);
console.log(typeof personObject);





// now for a challenge. take a json and convert it into an object, add a property, and turn it back into a json
console.log("CHALLENGE AREA");


var animal = '{"name": "donny"}';


// convert to javascript object
var animalObject = JSON.parse(animal);

// add age property
animalObject.age = 12;

// convert back into json and print to the screen
animal = JSON.stringify(animalObject);


console.log(animal);
console.log(typeof animal);







