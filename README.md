# Modern-JavaScript

## Factory Pattern
The factory pattern is a type of Object Oriented pattern which follows the DRY methodology. As the name suggests, object instances are created by using a factory to make the required object for us.

Let’s have a look at a very simple example of using the factory pattern to assemble an alligator object. To do that we first need to make factories that create the alligator parts for us:

`class TailFactory {
  constructor(props) {
    this.tailLength = props.tailLength;
  }
};

class TorsoFactory {
  constructor(props) {
    this.color = props.color;
  }
};

class HeadFactory {
  constructor(props) {
    this.snoutLenth = props.snoutLenth;
  }
};`

### Read More About The Factory Pattern [Here](https://alligator.io/js/factory-pattern/)