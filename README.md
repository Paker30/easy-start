# easy-start

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Minimal configuration to start a npm module from scratch (on my way).

## Module structure

```
module
│   .eslintrc    
│   .gitignore    
│   package.json    
│   README.md    
│
└───src
│   │   index.js
│   
└───test
    │   index.test.js
```

⚠️ By default the module is created as type _module_ -in case you don't like it, remove "type" property from the ```package.json```-

### Dependencies

- [eslint](https://eslint.org/)
- [jest](https://jestjs.io)

## Install the generator 🚀

In order to install the generator

> npm i -g generator-easy-start

## Start a new module 📝

Create a folder and navigate into it

> mkdir my-new-module && cd my-new-module

Execute the scaffolding and 🥳

> yo easy-start
