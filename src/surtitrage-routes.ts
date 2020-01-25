import {Request, Response} from "express";
import * as core from "express-serve-static-core";
import {IRoutable} from "./routes";
import * as fs from "fs";
import * as _ from "lodash";
import * as yargs from 'yargs';

export class SurtitrageRoutes implements IRoutable {

    repliques: string[];
    fichier: string = 'test/repliques.txt';
    port;

    constructor() {
        this.repliques = fs.readFileSync(this.fichier, 'utf8').split('\n');
        this.port = yargs.argv.port ? yargs.argv.port : 8000;
    }

    public routes(router: core.Router): void {
        router
            .get(
                '/surtitrage',
                (req: Request, res: Response) => {
                    let repliqueMiseEnForme = '';
                    let replique = this.repliques[req.query.replique ? req.query.replique : 0];
                    _.forEach(replique.split('\\n'), (ligneDansLaReplique) => {
                        repliqueMiseEnForme += `<p>- ${ligneDansLaReplique}</p>`;
                    });
                    res.send(`
                        <html>
                            <head>
                                <title>Surtitrage ${this.fichier}</title>
                                <style>
                                    body { 
                                        background-color: black;
                                        color: white; 
                                        font-size: 30px;
                                        font-family: Arial, Helvetica, sans-serif;
                                    }
                                </style>
                            </head>
                            <body>
                                <script>
                                    let showBorders = false;
                                    document.body.onkeyup = function(e){
                                        const urlParams = new URLSearchParams(window.location.search);
                                        const replique = urlParams.get('replique') ? urlParams.get('replique') : 0; 
                                        if(e.key === 'ArrowRight' && replique < ${this.repliques.length - 1}){
                                            window.location.href = 'http://localhost:${this.port}/surtitrage?replique=' + new String(parseInt(replique)+1);
                                        }
                                        else if(e.key === 'ArrowLeft' && replique > 0){
                                            window.location.href = 'http://localhost:${this.port}/surtitrage?replique=' + new String(parseInt(replique)-1);
                                        }
                                        else if(e.key === 'b'){
                                            if(showBorders == true) {
                                                document.getElementsByTagName("body")[0].style.border = '';
                                            } else {
                                                document.getElementsByTagName("body")[0].style.border = '5px solid white';
                                            }
                                            showBorders = !showBorders;
                                        }
                                    }
                                </script>
                                ${repliqueMiseEnForme}
                            </body>
                        </html>
                    `
                    )
                    ;
                }
            )
            .get(
                '/script',
                (req: Request, res: Response) => {
                    let liRepliques = '';
                    _.forEach(this.repliques, (replique: string) => {
                        liRepliques += `<li>${replique}</li>`;
                    });
                    res.send(`
                        <html>
                            <head>
                                <style>
                                    #instructions {
                                        border: 3px solid black;
                                        padding: 10px;   
                                        position: absolute;
                                        top: 50%;
                                        right: 10%;                                 
                                    }
                                </style>
                            </head>
                            <body>
                                <ul>
                                ${liRepliques}
                                </ul>
                                <div id="instructions">
                                    Plein écran : F11<br/>
                                    Afficher la bordure : b<br/>
                                    Réplique suivante : →<br/>
                                    Réplique précédente : ←
                                </div>
                            </body>
                        </html>
                    `);
                }
            );
    }
}