// Step1: prendere tutti i valori dai componenti nel HTML
// per riferirci ad un elemento html prendo il suo id.
// e ottengo una variabile contenente un riferimento ad esso 
// tramite il metodo getElementById() dell'oggetto Document.

// const indica che il riferimento non cambierà
const inputField = document.getElementById("input-temp");
const fromUnitField = document.getElementById("input-unit");
const toUnitField = document.getElementById("output-unit");
const outputField = document.getElementById("output-temp");
const form = document.getElementById("converter");

// Step2: implementare la logica della connessione
// Step2.1: implemetare una funzione che prenda:
//  - value: il valore della temp
//  - l'unità da cui effettuare la conversione
//  - l'unità verso cui efefttuare la conversione 
function convertTemp(value, fromUnit, toUnit) {
    // "c" per identificare Celsius
    // "f" per Fahrenheit
    // "k" per Kelvin
    if (fromUnit === "c") {
        if (toUnit === "f") {
            return value * 9 / 5 + 32;
        } else if (toUnit === "k") {
            return value + 273.15;
        }
        return value;
    }
    if (fromUnit === "f") {
        if (toUnit === "c") {
            return (value - 32) * 5 / 9;
        } else if (toUnit === "k") {
            return (value + 459.67) * 5 / 9;
        }
        return value;
    }
    if (fromUnit === "k") {
        if (toUnit === "c") {
            return value - 273.15;
        } else if (toUnit === "f") {
            return value * 9 / 5 - 459.67;
        }
        return value;
    }
    throw new Error("Invalid unit");
}

form.addEventListener("input", () => {
    // ottiene il valore da inputField; parseFloat fa parte della libreria core di JavaScript
    const inputTemp = parseFloat(inputField.value);
    // ottiene il valore scelto del primo <select>
    const fromUnit = fromUnitField.value;
    // ottiene il valore scelto nel secondo <select>
    const toUnit = toUnitField.value;
    // invoco la funzione per la conversione
    const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
    // scrivo il valore ottenuto nell'output field
    outputField.value = (Math.round(outputTemp * 100) / 100) + " " + toUnit.toUpperCase();
});

