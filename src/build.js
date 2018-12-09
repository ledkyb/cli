const chalk = require('chalk'),
	shell = require('shelljs'),
	ora = require('ora'),
	s = require('string'),
	isType = require('check-types'),
	boxen = require('boxen'),
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
				this.install(answers.directory);
				//spinner.succeed();  // call in the next promise once its resolved
			});
		}
	}

	install(path) {
		if (shell) {

			new Promise((resolve, reject) => {
				let spinner = ora('\nInstalling additional packages...').start();

				shell.cd(path);
				shell.exec(`yarn add bootstrap`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('Additional packages installed!');
					resolve(true);
				});

			}).then(response => {
				//spinner.succeed();  // call in the next promise once its resolved
			});
		}
	}

	logError(e) {
		if (chalk) {
			return chalk.keyword('red')(e + ' \n');
		}
	}

	getPackage(dir) {
		return new Promise((resolve, reject) => {
			fs.readFile(dir + '/package.json', "latin1", (error, data) => {
				try {
					if (error) throw error;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			})
		})
	}

	
	readPackage(dir, option) {
		this.getPackage(dir).then(response => {
			if (shell) {
				let myPackage = typeof response === 'string' ? JSON.parse(response) : response;
				let response = option === 'all' ? myPackage : myPackage[option];
				
				shell.echo('\n' + chalk.keyword('orange')(s(option).capitalize() + ': ' + response));
				
			}
		}).catch(error => {
			console.trace(this.logError(error));
		})
	} 
	
	updatePackage() {
		// test
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