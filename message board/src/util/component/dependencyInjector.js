'use strict'

var path = require('path');
const Bottle = require('bottlejs');
var bottle = new Bottle();

const glob = require('glob');
// traverse the file system, passing this bottle to every javascript file we find
glob.sync(path.join(path.resolve(__dirname), './*.js')).forEach((match) => {
    if (match.includes('test/') || typeof (require(match)) !== 'function') {
        return;
    }
    require(match)(bottle);
});

glob.sync(path.join(path.resolve(__dirname), '../../component/**/*.js')).forEach((match) => {
    //console.log("path.resolve(__dirname): " + path.resolve(__dirname));
    //console.log("path.join(path.resolve(__dirname), '../../component/**/*.js'): " + path.join(path.resolve(__dirname), '../../component/**/*.js'));
    //console.log("Value of Match: " + match);
    //console.log("Type of Value: " + typeof (require(match)));
    //console.log("match.endsWith('routes/index.js'): " + match.includes('routes/'));
    //console.log("match.indexOf('node_modules') >= 0: " + match.indexOf('node_modules') >= 0);
    if (match.includes('test/') || match.includes('routes/') || match.includes('dto/') || typeof (require(match)) !== 'function') {
        return;
    }
    require(match)(bottle);
});

glob.sync(path.join(path.resolve(__dirname), '../**/*.js')).forEach((match) => {
    //console.log(match);
    if (match.includes('test/') || typeof (require(match)) !== 'function') {
        return;
    }
    require(match)(bottle);
});

module.exports = bottle.container;
