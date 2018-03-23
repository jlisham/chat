var expect = require('expect');
const {isRealStr} = require('./validation');

describe('isRealStr', () => {
    it('should reject non-string values', () => { 
    var res = isRealStr('');
       expect(res).toBeFalsy();
    });
    it('should reject string with only spaces', () => { 
        var res = isRealStr('       ');
           expect(res).toBeFalsy();
    });
    it('should accept string with non-space chars', () => { 
        var res = isRealStr('someone  who  signed in');
           expect(typeof res).toBeTruthy();
    });
});