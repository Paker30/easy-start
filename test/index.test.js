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
                    ['package.json', /"type": "module"/],
                  ]);
            });
    });
});