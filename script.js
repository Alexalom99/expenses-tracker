// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp 

const fs = require('fs');
const path = require('path');

const json =  fs.readFileSync('expenses.json');
const data = JSON.parse(json);

let last = data.at(-1);

const command = process.argv[2];

function capitalize( string ) {
    return string[0].toUpperCase() + string.slice(1);
}


function list(data) {
    for (index in data) {
        let msg = `#${data[index].id} ${formatDate(data[index].timestamp)} ${data[index].concept} ${capitalize(data[index].category)} ${data[index].amount}€` 
        console.log(msg);
    }
}

function summary(data) {
    let sum = 0;
    for (spense of data) {
        sum += spense.amount;
    }
    return sum
}

function filterCategory(data, category) {
    return data.filter((spense) => capitalize(spense.category) === category);
}

function find(data, id) {
    return data.filter((spense) => spense.id == id);
}

function formatDate(dateStamp) {
    let date = new Date(dateStamp * 1000);
    let result = date.toLocaleDateString()
    return result;
}

function add(data, conc, cat, amount) {
    let date = Date.now()
    let gasto = {
        id: last.id + 1,
        timestamp: date,
        category: cat,
        concept: conc,
        amount,
    }
    data.push(gasto);
    let json = JSON.stringify(data);
    fs.writeFileSync("expenses.json", json, "utf-8");
}

function deleteId(data, id) {
    newData = data.filter((spense) => spense.id != id);
    let json = JSON.stringify(newData);
    fs.writeFileSync('expenses.json', json, "utf8");
}


switch(command) {
    case '--list':
        list(data);
        break;

    case '--summary':
        console.log(`El gasto total es de ${summary(data)}€`);
        break;

    case '--filter-category':
        const category = process.argv[3];
        const filtered = filterCategory(data, category);
        list(filtered);
        break;
    
    case '--find':
        const id = process.argv[3];
        const spense = find(data, id);
        list(spense);
    
    case '--add':
        const concept = process.argv[3];
        const cat = process.argv[4];
        const amount = process.argv[5];
        add(data, concept, cat, amount);

        
    case '--delete':
        const index = process.argv[3];
        deleteId(data, index);

}