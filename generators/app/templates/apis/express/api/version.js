import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const version = (req, res) => {
    res.send(version);
};

export {
    version
};
