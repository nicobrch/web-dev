const frutas = ["Manzana", "Mango", "Pera"]
const sueldos = [100, 500, 250]
const personas = [
	{
		nombre: "Jose",
		edad: 22
	},
	{
		nombre: "Elisa",
		edad: 21
	}
]
let verduras = ["Lechuga", "Apio", "Brocoli"]
verduras[1] = "Alcachofa"

// includes()
// Verificar si un valor existe en un array. Retorna V o F.
console.log(frutas.includes("Mango"))

// some()
// Verificar si existe valor dada una función. Retorna V o F.
const esPar = (valor) => valor % 2 == 0
console.log(sueldos.some(esPar))

// find()
// Encontrar un valor, si existe, dada una función. Retorna el valor o undefined.
const sobre300 = (valor) => valor > 300
console.log(sueldos.find(sobre300))

// filter()
// Encontrar todos los valores, si existen, dada una función. Retorna el valor o undefined.
const masLargo = (valor) => valor.length > 4;
console.log(verduras.filter(masLargo))