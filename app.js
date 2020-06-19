
const User = function(name) {
    this.name = name;
    this.chatroom = null;
}

// The users are the Colleagues  of the chatroom
User.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to)
    },
    recieve: function(message, from) {
        console.log(`From: ${from.name} To: ${this.name} \nMessage: ${message}`)
    }
}

// The chatroom is the mediator
const Chatroom = function() {
    let users = {}; // list of users

    return {
        register: function(user) {
            users[user.name] = user;
            user.chatroom = this;
        },
        send: function(message, from, to) {
            if(to) {
                // Single user message
                to.recieve(message, from)
            } else {
                // Message to all
                for(key in users) {
                    if(users[key] !== from) {
                        users[key].recieve(message, from)
                    }
                }
            }
        }
    }
}


const louie = new User('Louie');
const katie = new User('Kaite');
const missy = new User('Missy');
const mochi = new User('Mochi');
const rocket = new User('Rocket');

const chatroom = new Chatroom();

chatroom.register(louie)
chatroom.register(katie)
chatroom.register(missy)
chatroom.register(mochi)
chatroom.register(rocket)

louie.send("Hey gurl.", katie)
missy.send("You're my favorite.", louie)
mochi.send("I want super worms.")
rocket.send("Where is Katie?", katie)