import app from "./app";
import * as yargs from  'yargs';

let port = yargs.argv.port ? yargs.argv.port : 8000;
app.listen(port, () => {
    console.log(`Le surtitrage est disponible à l'adresse http://localhost:${port}/surtitrage`);
    console.log(`Le script est disponible à l'adresse http://localhost:${port}/script`);
});