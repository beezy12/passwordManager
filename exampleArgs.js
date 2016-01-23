// this module uses yargs module (or package) which allows (i think) which allows us to take user input at the
// command line.



var argv = require('yargs')
	.command('hello', 'greets the user', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'your first name goes here',
				type: 'string'
			},
			lastname: {
				demand: true,
				alias: 'l',
				description: 'give me your last name',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

// SO argv is basically just an object, and you set different key value pairs (properties) on it
console.log(argv);

// so if the command is hello and the person provided a name, print a custom message for them
if (command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
	console.log('hello '+ argv.name + ' ' + argv.lastname);
} else if (command === 'hello' && typeof argv.name !== 'undefined') {
	console.log('hello ' + argv.name)
} else if (command === 'hello') {
	console.log('there are no names here');
}
