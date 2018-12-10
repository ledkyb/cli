const questions = {
	create: [{
			type: 'input',
			name: 'name',
			message: 'Enter project name (myApp) ...'
		}, {
			type: 'input',
			name: 'modules',
			message: 'Extra modules [mod1 mod2 mod3]...'
		}
	]
};

module.exports = {
	questions
}