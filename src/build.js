const chalk = require('chalk'),
	shell = require('shelljs'),
	ora = require('ora'),
	s = require('string'),
	isType = require('check-types'),
	boxen = require('boxen'),
	jsonfile = require('jsonfile'),
	fs = require('fs');

class myApp {

	welcome() {
		if (shell) {
			shell.echo(boxen(chalk.orange.bold('\nLedkyb CLI\n'), {
				padding: 1,
				borderStyle: 'round'
			}))
		}
	}

	initMessage() {
		shell.echo(chalk.keyword('orange')('\nYour project will begin building now...\n\n'))
	}

	init(answers) {

		// while a spinner is running, if you echo, you will get a duplicate without a check mark

		if (shell) {

			new Promise((resolve, reject) => {
				console.log(answers);
				let spinner = ora('\nLoading CRA...').start();
				shell.exec(`yarn create react-app ${answers.directory}`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('CRA loaded as base!');
					resolve(true);
				});

			}).then(response => {
				this.install(answers);
				//spinner.succeed();  // call in the next promise once its resolved
			});
		}
	}

	install(answers) {
		if (shell) {

			new Promise((resolve, reject) => {
				let spinner = ora('\nInstalling additional packages...').start();

				shell.cd(answers.directory);
				shell.exec(`yarn add bootstrap`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('Additional packages installed!');
					resolve(true);
				});

			}).then(response => {
				//this.updatePackage(answers); 
			});
		}
	}

	logError(e) {
		if (chalk) {
			return chalk.keyword('red')(e + ' \n');
		}
	}
  
	updatePackage(answers) {
		if (shell) {
		 
			new Promise((resolve, reject) => {
				let spinner = ora('\nFinishing up...').start();
				const file = answers.directory + '/package.json';

				
				let myPackage = jsonfile.readFile(file); 
				
				myPackage['author'] = answers['author']; 
				myPackage['name'] = answers['name'];
				myPackage['version'] = answers['version'];

				jsonfile.writeFileSync(file, myPackage, { spaces: 2 })
					.then(res => {
						spinner.succeed('Project finished!');
						resolve(true);
					})   
			}).then(response => {
				 console.log('done!');
			}).catch(err => {
				console.log(err);
			});
		}

		 
	 
	} 
 
	success() {
		shell.echo(chalk.keyword('green').bold('\nProject created successfully!\n'))
		shell.echo(chalk.keyword('green')(`\nYou can navigate to ${path}\\ and `) + chalk.keyword('orange')(`yarn start\n`))
	}
}

const app = new myApp();

module.exports = {
	app
}