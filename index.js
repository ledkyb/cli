#!/usr/bin/env node

const program = require('commander'),
	chalk = require('chalk'),
	isType = require('check-types'),
	{
		prompt
	} = require('inquirer'),
	{
		app
	} = require('./src/build'),
	{questions} = require('./src/prompts');


program
	.version('1.0.0')
	.description(chalk.bold('CLI for Ledkyb Studios') + '\nBuilt to simplify development.');

program
	.command('info <dir>')
	.alias('i')
	.description('Retrieve information within package.json file.')
	.option("--o, --option <prop>", "Property to retrieve.")
	.action((dir, options) => {
		try {
			if (!isType.string(options.option)) throw 'Option was incorrectly set?'; // check if option is set 
			if (!isType.string(dir)) throw 'Directory must be a string!'; // check if option is set 

			app.readPackage(dir, options.option);
		} catch (error) {
			console.trace(app.logError(error));
		}
	})

program
	.command('create')
	.description('create a starter environment for building react sites')
	.alias('c')
	.action(() => {
		prompt(questions.create).then(answers => { 
			app.welcome();
			app.initMessage(); 
			app.init(answers);  
		}); 
	})

program
	.parse(process.argv);