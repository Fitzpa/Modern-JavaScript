# Modern-JavaScript

## Module & Revealing Module Patterns
A *module* is defined by creating an IIFE (Immediately Invoked Function Expression), with an anonymous function inside it.

` const UIController = (() => {
    let text = 'Hello World'

    const changeText = () => {
        const element = document.querySelector('h1')
        element.textContent = text
    }
    return {
        callChangeText: () => {
            changeText()
            console.log(text)
        }
    }
})() `

The *callChangeText* method is made public, and allows the *changeText* function to be called within it. However *changeText* is technically Private so you can't call `UIController.changeText()` for example.
In order to have *changeText* called you would have to call `UIController.callChangeText()`

### The Revealing Module Pattern 
The central principle of the Revealing Module Pattern is that all functionality  and variables should be hidden unless deliberately exposed in the return statement.

` const PersonController = (() => {
    let data = []

    const add = (person) => {
        data.push(person)
        console.log(`Person ${person.name} added to array.`)
    }

    const get = (id) => {
        return data.find(person => {
            return person.id === id
        })
    }

    return {
        add: add,
        get: get
    }
})() `

The methods *add* and *get* are made public by exposing them in the return statement. The *data* array remains private.

### Learn More About Module Pattern from [Ben Cherry](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)

