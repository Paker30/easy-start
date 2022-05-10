import pkg from '../../package.json' assert {type: "json"};

const apiVersion = (req, res) => {
    console.log(pkg)
    res.send(pkg.version);
};

export {
    apiVersion
};
