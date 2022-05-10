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
            },
            {
                type: 'confirm',
                name: 'api',
                message: 'Do you want to add an API framework?',
                default: false,
                store: true
            },
            {
                type: 'list',
                name: 'apiFramework',
                message: 'Which API do you want?',
                choices: [
                    'express',
                    'hapi',
                    'none of the above'
                ],
                when: (answers) => answers.api,
                store: true
            },
        ]);
    }

    writing() {
        let apiModules;
        switch (this.answers.apiFramework) {
            case 'express':
                apiModules = { dependencies: { 'express': '^4.18.1' } };
                break;
            case 'hapi':
                apiModules = {
                    dependencies: {
                        '@hapi/hapi': '^20.2.2',
                        '@hapi/glue': '^8.0.0',
                        '@hapi/inert': '^6.0.5',
                        '@hapi/vision': '^6.1.0',
                        'hapi-swagger': '^14.2.5'
                    }
                };
                break;
            default:
                apiModules = null;

        };

        const pkgJson = {
            main: 'src/index.js',
            version: '1.0.0',
            files: [
                'src'
            ],
            type: 'module',
            author: this.answers.author,
            scripts: {
                start: 'node src/index.js',
                test: 'jest'
            },
            type: 'module',
            devDependencies: {
                'eslint': '^8.10.0',
                'eslint-config-airbnb-base': '^15.0.0',
                'eslint-plugin-import': '^2.25.4',
                'jest': '^27.5.1'
            },
            engines: {
                node: '>=12',
                npm: '>=6'
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

        this.fs.extendJSON(
            this.destinationPath('package.json'),
            apiModules
                ? {
                    ...pkgJson,
                    ...apiModules,
                    scripts: {
                        start: 'node src/index.js',
                        test: 'jest',
                        build: 'docker build . -t ' + this.answers.name + ':${npm_package_version} -t ' + this.answers.name + ':latest'
                    }
                }
                : pkgJson
        );
        this.fileList(this.answers).map(({ origin, destination, variables }) => {
            switch (origin) {
                case 'README.md':
                case '.gitignore':
                case '.eslintrc':
                case '.eslintrc':
                case 'index.test.js':
                    this.fs.copyTpl(
                        this.templatePath(origin),
                        this.destinationPath(destination),
                        variables
                    );
                    break;
                case 'index.js':
                    const files = this.answers.api && this.answers.apiFramework !== 'none of the above'
                        ? [
                            { origin: `apis/${this.answers.apiFramework}/index.js`, destination },
                            { origin: `apis/${this.answers.apiFramework}/api/version.js`, destination: 'src/api/version.js' },
                            { origin: `apis/${this.answers.apiFramework}/api/helloWorld.js`, destination: 'src/api/helloWorld.js' },
                            { origin: 'Dockerfile', destination: 'Dockerfile', variables: { author: this.answers.author, email: this.answers.email } },
                            { origin: '.dockerignore', destination: '.dockerignore' }
                        ]
                        : [{ origin, destination }];
                    files.map(({ origin, destination, variables }) => {
                        this.fs.copyTpl(
                            this.templatePath(origin),
                            this.destinationPath(destination),
                            variables
                        );
                    })
                    break;
                default:
                    console.log(origin);
                    break;
            }
        });
    }
};