for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0 && i % 10 === 0) {
        console.log("habis dibagi 3,5,10")
    } else if (i % 3 === 0 && i % 5 === 0) {
        console.log("habis dibagi 3,5")
    } else if (i % 3 === 0) {
        console.log("habis dibagi 3")
    } else if (i % 5 === 0) {
        console.log("habis dibagi 5")
    } else {
        console.log(i)
    }
}