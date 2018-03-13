var expect = require('expect');

var {generateMsg} = require('./message');

describe('generateMsg', () => {
    var from = 'someone';
    var text = 'some content';
    var msg = generateMsg(from, text);
    it('should generate correct msg obj', () => { 
       // expect(msg.created).toBeA('number');
        expect(msg).toMatchObject({from, text});
    });
});