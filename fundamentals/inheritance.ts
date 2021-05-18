function Person(name) {
    this.name = name;
  }
  
  Person.prototype.walk = function() {
    console.log(this.name + ' is walking here!');
  }
  
  const bob = new Person('Bob');
  bob.walk();
  const john = new Person('John');
  john.walk();
  
  john.walk.call({name: 'Kale'});
  
  const person = {
    walk: function() {
      console.log(this.name + ' is walking here!');
    }
  };
  
  const todd = Object.create(person, {
    name: {
      value: 'Todd'
    }
  });
  
  todd.walk();
  todd.hasOwnProperty('walk');
  console.log(todd);
  console.log(typeof(todd));
  // todd.prototype.walk = function() {
  //   console.log('Are we walking here?');
  // }
  // todd.walk();
  console.log(todd.isPrototypeOf(person));