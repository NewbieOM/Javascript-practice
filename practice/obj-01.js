const car = {
    brand: "BMW",
    price: 500000,
    year: 2022
};
const car2 = {
    brand: "Audi",
    price: 400000,
    year: 2022
};

function getCarInfo(car) {
    console.log(`${car.brand} costs ${car.price}`)
}
function getCarInfo(car2) {
    console.log(`${car2.brand} costs ${car2.price}`)
}

getCarInfo(car);
getCarInfo(car2);