var expect = require('expect');

var {generateMsg, generateLocMsg} = require('./message');

describe('generateMsg', () => {
    it('should generate correct msg obj', () => { 
    var from = 'someone';
    var text = 'some content';
    var msg = generateMsg(from, text);
       expect(typeof msg.created).toBe('number');
       expect(msg).toMatchObject({from, text});
    });
});

describe('generateLocMsg', () => {
    it('should generate correct loc obj', () =>{
    var from = 'a name';
    var lat = 15;
    var lon = 19;
    var url = 'https://google.com/maps?q=15,19';
    var msg = generateLocMsg(from, lat, lon);
    expect(typeof msg.created).toBe('number');
    expect(msg).toMatchObject({from, url});
    });
});