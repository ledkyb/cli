const chalk = require('chalk'),
      shell = require('shelljs'),
	    ora = require('ora'), 
	  boxen = require('boxen');

class myApp {

	welcome() {
		if (shell) { 
			console.log(boxen(chalk.white.bold('\nLedkyb Studios\n'), {
				padding: {
					top: 0,
					bottom: 0,
					left: 8,
					right: 8
				},
				borderStyle: 'double'
			}))
		}
	}

	initMessage() {
		shell.echo(chalk.keyword('red')('\nYour project will begin building now...\n\n'))
	}

	init(answers) {
 
		if (shell) {

			new Promise((resolve, reject) => { 
				let spinner = ora('\nLoading react app...').start();
				shell.exec(`yarn create react-app ${answers.name}`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('Base app loaded!');
					resolve(true);
				});

			}).then(response => {
				this.install(answers); 
			});
		}
	}

	install(answers) {
		if (shell) {

			new Promise((resolve, reject) => {
				let spinner = ora('\nInstalling additional packages...').start();

				shell.cd(answers.name);
				shell.exec(`yarn add bootstrap ${answers.modules}`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('Additional packages installed!');
					resolve(true);
				});

			}).then(response => {
				shell.echo('\n\nComplete!');
			});
		}
	} 
}

const app = new myApp();

module.exports = {
	app
}