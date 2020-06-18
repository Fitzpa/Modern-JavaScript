const Singleton = (() => {
    let instance;

    const createInstance = () => {
        const object = new Object({text: 'Object Instance.'})
        return object
    }

    return {
        getInstance: () => {
            if(!instance){
                instance = createInstance();
            }
            return instance
        }
    }
})()

const instanceA = Singleton.getInstance()
const instanceB = Singleton.getInstance()

console.log('instanceA ', instanceA)
console.log('instanceB ', instanceB)
console.log('instanceA === instanceB: ', instanceA === instanceB)
// You can never have more than one instance.