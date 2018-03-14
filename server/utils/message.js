var generateMsg = (from, text) => {
    return{
        from, text, created: new Date().getTime()
    }
};

var generateLocMsg = (from , lat, lon) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lon}`,
        created: new Date().getTime()
    }
}

module.exports = {generateMsg, generateLocMsg};