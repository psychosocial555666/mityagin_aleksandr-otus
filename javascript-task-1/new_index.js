const sum = function (number) {
    return function (nextNumber) {
        return nextNumber ? sum(number + nextNumber) : number
    }
};

console.log(sum(1)(2)(3)())

const arr = [
    ["q", "w", 'a'],
    ["a", "b"],
    ["a", "c"],
    ["q", "e"],
    ["q", "r"],
]

const arr2 =  [["a", "b"], ["a", "c"], ["d", "e"]];

const maxItemAssociation = (array) => {
    let allAssosiationsArray = [];
    const arrayFlat = array.flat();

    const countItems = arrayFlat.reduce((acc, item) => {
        acc[item] = acc[item] ? acc[item] + 1 : 1;
        return acc;
    }, {});

    Object.keys(countItems).forEach(key => {
        if (countItems[key] > 1) {
            array.forEach(subArray => {
                if (subArray.includes(key)) {
                    allAssosiationsArray = allAssosiationsArray.concat(subArray)
                }
            })
        }
    })

    const unique =  new Set(allAssosiationsArray);
    return Array.from(unique).sort();
}


console.log(maxItemAssociation(arr));


console.log(maxItemAssociation(arr2));