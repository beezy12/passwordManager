// be sure to check out master for an easier version of this

// this module lets a user create a profile at the command line by typing:
// node app.js create -n facebook -u beezy -p booger -m masterP
// n is name of the account, u is username, p is password, m is masterpassword

// you can also run node app.js get -n twitter -m masterP    to retrieve info

// This module uses the yargs package (allows for user input at the CL,
// and the node-persist package (lets you store user data locally)
// and crypto-js which allows for encryption

console.log("starting password manager");

var crypto = require('crypto-js');
var storage = require('node-persist');

// this gets the computer to get ready to start writing and saving variables for node-persist
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



function getAccounts(masterpassword) {
	// use getItemSync to fetch accounts
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];

	// decrypt
	if (typeof encryptedAccount !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedAccount, masterpassword);
		accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	// return accounts array
	return accounts;
}

function saveAccounts(accounts, masterpassword) {
	// encrypt accounts (you end up with a string when you encrypt)
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterpassword);

	// setItemSync
	storage.setItemSync('accounts', encryptedAccounts.toString());

	// return accounts array
	return accounts;
}


function createAccount(account, masterpassword) {
	var accounts = getAccounts(masterpassword);

	accounts.push(account);

	// calling the saveAccounts function and passing it it's two arguments
	saveAccounts(accounts,masterpassword);

	return account;
}

function getAccount(accountName, masterpassword) {
	// var accounts = storage.getItemSync('accounts');
	var accounts = getAccounts(masterpassword);
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
