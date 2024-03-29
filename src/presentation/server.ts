import { request } from 'http';

import express from "express";
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
};

export class Server {

    private app = express();
    private readonly port: number; // a los readonly sólo se les pueden asignar valores en el constructor, además de al declararlos
    private readonly publicPath: string;

    constructor( options: Options ) {
        const { port, public_path = "public" } = options;
        this.port = port;
        this.publicPath = public_path;
    };

    async start() {

        //* Middlewares

        //* Public Folder
        this.app.use( express.static( this.publicPath ));

        this.app.get("*", ( request, response ) => {

            const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html` );
            response.sendFile( indexPath );
            return; //optional
        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });        
    };
};



