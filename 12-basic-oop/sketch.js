// Basic OOP syntax demo

class Dog {
  constructor(name) {
    this.age = 0;
    this.name = name;
  }

  bark() {
    console.log(this.name + " says woof");
  }
}

let fido = new Dog("Fido");
let snoopy = new Dog("Snoopy");

function setup() {
  createCanvas(windowWidth, windowHeight);
  fido.bark();
  snoopy.bark();
}

function draw() {
  background(220);
}
