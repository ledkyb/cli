#!/usr/bin/env node

const program = require('commander'),
	{prompt} = require('inquirer'),
	{app} = require('./build')
	shell = require('shelljs');


program
	.version('1.0.0')
	.description('A react site generator CLI.');

program
	.command('test')
	.description('testing application')
	.action(() => {
		prompt({
			type: 'input',
			name: 'name',
			message: 'project name'
		}).then(answer => {
			const name = answer.name;
			app.base(name);  
			app.install(name); 
		})
	})

program
	.parse(process.argv);