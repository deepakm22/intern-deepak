class Car {
    constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    }

    displayCarDetails() {
    return `Car: ${this.brand} ${this.model}`;
    }
}

const car1 = new Car('Honda', 'Civic');
console.log(car1.displayCarDetails());  
