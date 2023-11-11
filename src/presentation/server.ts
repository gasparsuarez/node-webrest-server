import express, { Router } from 'express';
import path from 'path';


interface ServerOptions {
    port: number;
    router: Router;
    public_path?: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
    constructor(options: ServerOptions) {
        const { port, public_path = 'public', router } = options;
        
        this.port = port;
        this.publicPath = public_path;
        this.routes = router;
    }

    async start(){

        // * MiddleWare -> Se ejecuta sólo y antes de la primer petición
        
        // * Convierte el body de la petición a JSON 
        this.app.use( express.json() )
        // * Public Folder 
        this.app.use( express.static( this.publicPath ) );

        //* Routes
        this.app.use( this.routes );
    
        // * Spa
        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);       
            return;     
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}