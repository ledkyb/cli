#!/usr/bin/env node

const program = require('commander'),
	{prompt} = require('inquirer'),
	{app} = require('./build');

program
	.version('1.0.0')
	.description('A react site generator CLI.');

program
	.command('start')
	.description('testing application')
	.action(() => {

		app.welcome();

		prompt({
			type: 'input',
			name: 'name',
			message: 'Project name: '
		}).then(res => { 
			app.initMessage();
			app.init(res.name);
		})
	})

program
	.parse(process.argv);