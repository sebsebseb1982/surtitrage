import {Request, Response} from "express";
import * as core from "express-serve-static-core";
import {IRoutable} from "./routes";
import * as fs from "fs";
import * as _ from "lodash";

export class SurtitrageRoutes implements IRoutable {

    repliques: string;
    fichier: string = 'test/repliques.txt';

    constructor() {
        this.repliques = fs.readFileSync(this.fichier, 'utf8');
    }

    public routes(router: core.Router): void {
        router
            .get(
                '/surtitrage',
                (req: Request, res: Response) => {
                    let repliqueMiseEnForme = '';
                    let replique = this.repliques.split('\n')[req.query.replique ? req.query.replique : 0];
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
                                    document.body.onkeyup = function(e){
                                        const urlParams = new URLSearchParams(window.location.search);
                                        const replique = urlParams.get('replique') ? urlParams.get('replique') : 0; 
                                        if(e.key === 'ArrowRight'){
                                            window.location.href = 'http://localhost:${8000}/surtitrage?replique=' + new String(parseInt(replique)+1);
                                        }
                                        else if(e.key === 'ArrowLeft'){
                                            window.location.href = 'http://localhost:${8000}/surtitrage?replique=' + new String(parseInt(replique)-1);
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
                    _.forEach(this.repliques.split('\n'), (replique: string) => {
                        liRepliques += `<li>${replique}</li>`;
                    });
                    res.send(`
                        <html>
                            <body>
                                <ul>
                                ${liRepliques}
                                </ul>
                            </body>
                        </html>
                    `);
                }
            );
    }
}