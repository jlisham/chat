// addUser(id, name, room);
// delUser(id);
// getUser(id);
// getUserList(room);

class Users {
    constructor () {
        this.users =[];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    delUser(id){
        var user = this.getUser(id);
        if (user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var unArray = users.map((user) =>  user.name);

        return unArray;
    }
}

module.exports = {Users};


