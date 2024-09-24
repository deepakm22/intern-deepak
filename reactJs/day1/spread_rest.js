const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5, 6];  
console.log(newNumbers);  
console.log(...numbers)


const sum = (...rest) => {
    return rest.reduce((total, current) => total + current, 0);
};

console.log(sum(1, 2, 3, 4));  



const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

const [first, ...restFruits] = fruits;

console.log(first);       

console.log(restFruits);    
