//* ES6 Classes

class EventObserver {
    constructor() {
        this.observers = [];
    }
    subscribe(fn) {
        this.observers.push(fn)
        console.log(`You are now subscribed to ${fn.name}`)
    }
    unsubscribe(fn) {
        // Here we are filtering out from the list whichever item matches the callback funtion. 
        // If there is no match then the callback stays in the list.
        // filter returns a new list and reassigns the list of observers.
        this.observers = this.observers.filter(function(item) {
            if(item !== fn) {
                return item
            }
        }) 
        console.log(`You are now unsubscribed from ${fn.name}`)
    }
    fire() {
        this.observers.forEach(function(item) {
            item.call()
        })
    }
}

const click = new EventObserver()

// Event Listeners
document.querySelector('.subscribe-ms').addEventListener('click', function() {
    click.subscribe(getCurrentMs)
})

document.querySelector('.unsubscribe-ms').addEventListener('click', function() {
    click.unsubscribe(getCurrentMs)
})

document.querySelector('.subscribe-s').addEventListener('click', function() {
    click.subscribe(getCurrentS)
})

document.querySelector('.unsubscribe-s').addEventListener('click', function() {
    click.unsubscribe(getCurrentS)
})

document.querySelector('.fire').addEventListener('click', function() {
    click.fire()
})

// Click handler
const getCurrentMs = function() {
    console.log(`Currnet time in Milliseconds: ${new Date().getMilliseconds()}`)
}

const getCurrentS = function() {
    console.log(`Currnet time in Seconds: ${new Date().getSeconds()}`)
}