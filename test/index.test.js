const Helpers = require('yeoman-test');
const Assert = require('yeoman-assert');

const path = require('path');
const { doesNotMatch } = require('assert');

describe('easy-start test', () => {
    it('generate a module', () => {
        return Helpers.run(path.join(__dirname, '../generators/app/index.js'))
            .withPrompts({ name: 'test-module', author: 'Benson' })
            .then(() => {
                Assert.file([
                    'README.md',
                    '.eslintrc',
                    '.gitignore',
                    'package.json',
                    './src/index.js',
                    './test/index.test.js'
                ]);

                Assert.fileContent([
                    ['README.md', /test-module/],
                    ['test/index.test.js', /first test-module/],
                    ['package.json', /"author": "Benson"/],
                    ['package.json', /"version": "1.0.0"/],
                    ['package.json', /"type": "module"/],
                ]);
            });
    });

    describe('generate an API', () => {
        it('express', () => {
            return Helpers.run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({ name: 'test-express', author: 'Benson', api: true, apiFramework: 'express' })
                .then(() => {
                    Assert.file([
                        'README.md',
                        '.eslintrc',
                        '.gitignore',
                        'package.json',
                        './src/index.js',
                        './test/index.test.js',
                        './src/api/helloWorld.js',
                        './src/api/version.js',
                        'Dockerfile',
                        '.dockerignore'
                    ]);

                    Assert.fileContent([
                        ['README.md', /test-express/],
                        ['test/index.test.js', /first test-express/],
                        ['package.json', /"author": "Benson"/],
                        ['package.json', /"version": "1.0.0"/],
                        ['package.json', /"type": "module"/],
                        ['package.json', /"build": "docker build \. -t test-express:\${npm_package_version} -t test-express:latest"/],
                        ['src/index.js', /express/],
                    ]);
                });
        });

        it('hapi', () => {
            return Helpers.run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({ name: 'test-hapi', author: 'Benson', api: true, apiFramework: 'hapi' })
                .then(() => {
                    Assert.file([
                        'README.md',
                        '.eslintrc',
                        '.gitignore',
                        'package.json',
                        './src/index.js',
                        './test/index.test.js',
                        './src/api/helloWorld.js',
                        './src/api/version.js',
                        'Dockerfile',
                        '.dockerignore'
                    ]);

                    Assert.fileContent([
                        ['README.md', /test-hapi/],
                        ['test/index.test.js', /first test-hapi/],
                        ['package.json', /"author": "Benson"/],
                        ['package.json', /"version": "1.0.0"/],
                        ['package.json', /"type": "module"/],
                        ['package.json', /"build": "docker build \. -t test-hapi:\${npm_package_version} -t test-hapi:latest"/],
                        ['src/index.js', /@hapi\/glue/],
                        ['src/index.js', /@hapi\/inert/],
                        ['src/index.js', /@hapi\/vision/],
                    ]);
                });
        });

        it('none of the above', () => {
            return Helpers.run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({ name: 'test-no-framework', author: 'Benson', api: true, apiFramework: 'none of the above' })
                .then(() => {
                    Assert.file([
                        'README.md',
                        '.eslintrc',
                        '.gitignore',
                        'package.json',
                        './src/index.js',
                        './test/index.test.js'
                    ]);
    
                    Assert.fileContent([
                        ['README.md', /test-no-framework/],
                        ['test/index.test.js', /first test-no-framework/],
                        ['package.json', /"author": "Benson"/],
                        ['package.json', /"version": "1.0.0"/],
                        ['package.json', /"type": "module"/],
                    ]);

                    Assert.noFile([
                        './src/api/helloWorld.js',
                        './src/api/version.js',
                        'Dockerfile',
                        '.dockerignore'
                    ]);
                });
        });
    });
});