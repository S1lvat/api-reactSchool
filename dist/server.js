"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const port = process.env.PORT_SERVER
_appjs2.default.listen(port, () => { console.log(`listen on port: ${port}`) })
