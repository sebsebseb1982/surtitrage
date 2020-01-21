import app from "./app";

let port = 8000;
app.listen(port, () => {
    console.log(`Le surtitrage est disponible à l'adresse http://localhost:${port}/surtitrage`);
    console.log(`Le script est disponible à l'adresse http://localhost:${port}/script`);
});