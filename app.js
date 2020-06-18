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
        }
    }
})()