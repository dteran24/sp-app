"use strict";
var mApp = require('./app');
var PORT = process.env.PORT || 3001;
mApp.listen(PORT, function () {
    console.log("Server listening on ".concat(PORT));
});
