const chalk = require('chalk'),
	shell = require('shelljs'),
	ora = require('ora');

class myApp {

	welcome() {
		if (shell) {
			shell.echo(chalk.keyword('orange').bold('\nCreate-react-site CLI\n'))
		}
	}

	initMessage() {
		shell.echo(chalk.keyword('orange')('\nYour project will begin building now...\n\n'))
	}

	init(path) {

		// while a spinner is running, if you echo, you will get a duplicate without a check mark

		if (shell) {

			new Promise((resolve, reject) => {
				let spinner = ora('\nLoading CRA...').start();
				shell.exec(`create-react-app ${path}`, {
					async: true,
					silent: true
				}, () => {
					spinner.succeed('CRA loaded as base!');
					resolve(true);
				});

			}).then(response => {
				this.install(path);
				//spinner.succeed();  // call in the next promise once its resolved
			});
		}
	}

	install(path) {
		if (shell) {

			new Promise((resolve, reject) => {
				let spinner = ora('\nInstalling additional packages...').start();

				shell.cd(path);
				shell.exec(`yarn add colors`, {
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

	success(){
		shell.echo(chalk.keyword('green').bold('\nProject created successfully!\n'))
		shell.echo(chalk.keyword('green')(`\nYou can navigate to ${path}\\ and `) + chalk.keyword('orange')(`yarn start\n`))
	}
}

const app = new myApp();

module.exports = {
	app
}