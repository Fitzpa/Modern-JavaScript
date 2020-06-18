// Module pattern
// iife
// (() => {
    // Declare private variables and functions

    // return {
        // Declare public variables and functions
    // }
// })()

// STANDARD MODULE PATTERN
const UIController = (() => {
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
})()

UIController.callChangeText()

// REVEALING MODULE PATTERN
const PersonController = (() => {
    // state
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
        get: get,
        viewData: () => console.log(data)
    }
})()

PersonController.add({id: 1, name: 'Louie'})
PersonController.add({id: 2, name: 'Katie'})
PersonController.add({id: 3, name: 'Missy'})
PersonController.add({id: 4, name: 'Rocket'})
PersonController.add({id: 5, name: 'Mochi'})
PersonController.viewData()
console.log(PersonController.get(3))