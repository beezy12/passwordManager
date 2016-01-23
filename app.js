// this module lets a user create a profile at the command line by typing:
// node app.js create -n facebook -u beezy -p booger
// n is name of the account, u is username, p is password
// This module uses the yargs package (allows for user input at the CL,
// and the node-persist package (lets you store user data locally)

console.log("starting password manager");

var storage = require('node-persist');

// this gets the computer to get ready to start writing and saving variables
storage.initSync();

var argv = require('yargs')
	.command('create', 'creates a user account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'creates the account name (ex: facebook, twitter)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'creates the user"s username',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'creates and stores the user password',
				type: 'string'
			},
			masterpassword: {
				demand: true,
				alias: 'm',
				description: 'master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'gets the user account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'the name of the user account'
			},
			masterpassword: {
				demand: true,
				alias: 'm',
				description: 'master password',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;    // this was originally tacked on to the end of require('yargs'), and still is chained onto that but down here
	var command = argv._[0];


function createAccount(account, masterpassword) {
	var accounts = storage.getItemSync('accounts');

	if(typeof accounts === "undefined") {
		accounts = [];
	}

	accounts.push(account);
	storage.setItemSync('accounts', accounts)

	return account;
}

function getAccount(accountName, masterpassword) {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function(account) {
		if(account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}



// createAccount({
// 	name: "facebook",
// 	userName: "brian",
// 	password: "butt"
// })

// var briansAccount = getAccount("facebook");
// console.log(briansAccount);


if (command === 'create') {
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
	}, argv.masterpassword);
	console.log('user created an account!');
	console.log(createdAccount);
} else if (command === 'get') {
	var fetchedAccount = getAccount(argv.name, argv.masterpassword);

	if (typeof fetchedAccount === 'undefined') {
		console.log("account not found. try again.")
	} else {
		console.log("account found: ");
		console.log(fetchedAccount);
	}
}












