const currentDateTime = new Date()


console.log(currentDateTime.toString())

const diwaliDate = new Date('2024-10-31')
const currentDate = new Date()

const timeDifference = diwaliDate - currentDate;
console.log("Milliseconds :", timeDifference)

const secondsToDiwali = Math.floor(timeDifference / 1000)
console.log("Seconds Until Diwali :" ,secondsToDiwali)