// import cookieParser from 'cookie-parser';
// import StatusCodes from 'http-status-codes';
// import { Server as SocketIo } from 'socket.io';
import express, { Request, Response } from 'express';
import http from 'http';


const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Chat page
app.get('/test', (req: Request, res: Response) => {
        return res.json({
            statusCode: 200,
            isSuccess: true,
            message: 'this is test api'
        });
    
});



const server = http.createServer(app);

export default server;
