const questions = {
	create: [{
			type: 'input',
			name: 'project',
			message: 'Enter project name (newApp) ...'
		},
		{
			type: 'input',
			name: 'directory',
			message: 'Enter directory name (myProject) ...'
		},
		{
			type: 'input',
			name: 'author',
			message: 'Enter author name ...'
		},
		{
			type: 'input',
			name: 'version',
			message: 'Enter project version (1.0.0) ...'
		}, {
			type: 'input',
			name: 'modules',
			message: 'Additional modules [mod1 mod2 mod3]...'
		}
	]
};

module.exports = {
	questions
}