const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.Licenses = ['MIT', 'ISC', 'Apache-2.0'];
        this.fileList = (answers) => [
            { origin: 'README.md', destination: 'README.md', variables: { name: answers.name } },
            { origin: '.gitignore', destination: '.gitignore', variables: {} },
            { origin: '.eslintrc', destination: '.eslintrc', variables: {} },
            { origin: 'index.js', destination: 'src/index.js', variables: {} },
            { origin: 'index.test.js', destination: 'test/index.test.js', variables: { name: answers.name } },
        ];
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname
            },
            {
                type: 'input',
                name: 'author',
                message: 'Who is the author of this awesome module?',
                validate: (author = '') => author ? true : 'Author can\'t be empty',
                store: true
            }
        ]);
    }

    writing() {
        const pkgJson = {
            main: 'src/index.js',
            files: [
                'src'
            ],
            type: 'module',
            author: this.answers.author,
            scripts: {
                'test': 'jest'
            },
            devDependencies: {
                'eslint': '^8.10.0',
                'eslint-config-airbnb-base': '^15.0.0',
                'eslint-plugin-import': '^2.25.4',
                'jest': '^27.5.1'
            },
            engines: {
                node: '>=12',
                npm: ">=6"
            },
            jest: {
                roots: [
                    '<rootDir>/test'
                ],
                testMatch: [
                    '**/__tests__/**/*.+(ts|tsx|js)',
                    '**/?(*.)+(spec|test).+(ts|tsx|js)'
                ],
                transform: {}
            }
        };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.fileList(this.answers).map(({ origin, destination, variables }) => {
            this.fs.copyTpl(
                this.templatePath(origin),
                this.destinationPath(destination),
                variables
            );
        });
    }
};