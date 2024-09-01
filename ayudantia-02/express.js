import express from "express"
const PORT = 3000

const app = express()

app.get("/", (req, res) => {
	res.send("Hola Mundo!")
})

app.get("/cats", (req, res) => {
	console.log(req.url) //logs "/cats"
  console.log(req.method) // logs GET
  console.log(req.headers) // logs all headers of the request
})

app.get("/cats/:id", (req, res) => {
	console.log(req.params.id) // logs ID
})

app.get("/cats/:id", (req, res) => {
	const cats = ["Sonic", "Chimuelo", "Serafina"]
	res.send({
		cats
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})