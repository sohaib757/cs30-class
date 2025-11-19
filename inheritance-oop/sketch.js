// OOP Inheritance

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}

class Car extends Vehicle {
  constructor(name) {
    super(name, "car");
  }

  getName() {
    return "This is a car called " + super.getName();
  }
}

// let speedy = new Vehicle("Kona", "car");
let speedy = new Car("Kona");

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(speedy.getName());
  console.log(speedy.getType());
}

function draw() {
  background(220);
}
