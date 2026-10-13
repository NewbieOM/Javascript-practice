const prices = [200, 450, 120, 800, 350];

function getTotal(one) {
    let sum = 0;

    for (let price of one) {
        sum += price; // Add price to sum
    }

    return sum;
}

console.log(getTotal(prices));