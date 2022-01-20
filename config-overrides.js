const {  overrideDevServer } = require("customize-cra");

const addProxy = () => (configFunction) => {
    return configFunction;
};
module.exports = {
    devServer: overrideDevServer(addProxy()),
};
