const cars = [
    { brand: "BMW", price: 500000 },
    { brand: "Tata", price: 200000 },
    { brand: "Audi", price: 700000 },
    { brand: "Honda", price: 300000 }
];

const expensiveCars = cars.filter(car => car.price > 300000);

console.log(expensiveCars);
