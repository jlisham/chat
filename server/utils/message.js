var moment = require('moment');

var generateMsg = (from, text) => {
    return{
        from, text, created: moment().valueOf()
    }
};

var generateLocMsg = (from , lat, lon) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lon}`,
        created: moment().valueOf()
    }
}

module.exports = {generateMsg, generateLocMsg};