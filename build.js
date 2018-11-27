class myApp {
	base(path){
		if (shell){
			shell.exec(`create-react-app ${path}`);
			shell.echo('CRA base has been loaded');
		}
	}

	navigate(path){
		if(shell){
			shell.cd(`${path}`);
		}
	}

	install(path){
		if(shell){
			this.navigate(path);
			shell.exec(`pwd`);
			//shell.exec(`npm install --save colors`);
		}
	}
}

const app = new myApp();

module.exports = { app }