const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {id:2, name: 'second', room:'peaches'},
            {id:3, name: 'third', room:'herb'},
            {id:4, name: 'fourth', room:'peaches'}
        ];
    });

    it ('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'username',
            room: 'peaches'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it ('should return chatters in room (peaches)', () => {
        var userList = users.getUserList('peaches');
        expect(userList).toEqual(['second', 'fourth']);
    }); 
    
    it ('should return chatters in room (herb)', () => {
        var userList = users.getUserList('herb');
        expect(userList).toEqual(['third']);
    });
    
    it ('should find user', () => {
        var uID = 2;
        var user = users.getUser(uID);
        expect(user.id).toBe(uID);
    });
    
    it ('should not find user', () => {
        var uID = 55;
        var user = users.getUser(uID);
        expect(user).toBeFalsy();
    });
    
    it ('should del user', () => {
        var uID = 2;
        var user = users.delUser(uID);
        expect(users.users.length).toBe(2);
    });
    
    it ('should not del user', () => {
        var uID = 1;
        var user = users.delUser(uID);
        expect(users.users.length).toBe(3);
    });
});