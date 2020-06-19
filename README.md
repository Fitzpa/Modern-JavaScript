# Modern-JavaScript

## State Pattern
### Definition
Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

Frequency of use (in JavaScript): medium low

### Summary
The State pattern provides state-specific logic to a limited set of objects in which each object represents a particular state. This is best explained with an example.

Say a customer places an online order for a TV. While this order is being processed it can in one of many states: New, Approved, Packed, Pending, Hold, Shipping, Completed, or Canceled. If all goes well the sequence will be New, Approved, Packed, Shipped, and Completed. However, at any point something unpredictable may happen, such as no inventory, breakage, or customer cancelation. If that happens the order needs to be handled appropriately.

Applying the State pattern to this scenario will provide you with 8 State objects, each with its own set of properties (state) and methods (i.e. the rules of acceptable state transitions). State machines are often implemented using the State pattern. These state machines simply have their State objects swapped out with another one when a state transition takes place.

Two other examples where the State pattern is useful include: vending machines that dispense products when a correct combination of coins is entered, and elevator logic which moves riders up or down depending on certain complex rules that attempt to minimize wait and ride times.

### Example
Our example is a traffic light (i.e. TrafficLight object) with 3 different states: Red, Yellow and Green, each with its own set of rules. The rules go like this: Say the traffic light is Red. After a delay the Red state changes to the Green state. Then, after another delay, the Green state changes to the Yellow state. After a very brief delay the Yellow state is changed to Red. And on and on.

It is important to note that it is the State object that determines the transition to the next state. And it is also the State object that changes the current state in the TrafficLight -- not the TrafficLight itself.

For demonstration purposes, a built-in counter limits the number of state changes, or else the program would run indefinitely.

The log function is a helper which collects and displays results.

`var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);
 
    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };
 
    this.start = function () {
        currentState.go();
    };
}
 
var Red = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Red --> for 1 minute");
        light.change(new Green(light));
    }
};
 
var Yellow = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};
 
var Green = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};
 
// log helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
    var light = new TrafficLight();
    light.start();
 
    log.show();
}`

### Read More About The State Pattern [Here](https://www.dofactory.com/javascript/mediator-state-pattern)