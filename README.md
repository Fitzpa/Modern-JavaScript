# Modern-JavaScript

## Singleton Pattern
The Singleton Pattern limits the number of instances of a particular object to just one. This single instance is called the singleton.

Singletons are useful in situations where system-wide actions need to be coordinated from a single central place. An example is a database connection pool. The pool manages the creation, destruction, and lifetime of all database connections for the entire application ensuring that no connections are 'lost'.

Singletons reduce the need for global variables which is particularly important in JavaScript because it limits namespace pollution and associated risk of name collisions. The Module pattern is JavaScript's manifestation of the Singleton pattern.

Several other patterns, such as, Factory, Prototype, and Façade are frequently implemented as Singletons when only one instance is needed.

### Read More About Singletons [Here](https://www.dofactory.com/javascript/singleton-design-pattern)

## Why/When Would You Want To Use The Singleton Pattern?
According to *Adam Ness* from Stack Overflow, 
A singleton should be used when managing access to a resource which is shared by the entire application, and it would be destructive to potentially have multiple instances of the same class. Making sure that access to shared resources thread safe is one very good example of where this kind of pattern can be vital.