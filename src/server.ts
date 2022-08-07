import express, { Request, Response } from 'express';
import BaseRouter from './routes/api';
import cors from 'cors';
import http from 'http';




const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.options('*', cors());
app.use('/api' , BaseRouter);

// Chat page
app.get('/test', (req: Request, res: Response) => {
        return res.json({
            statusCode: 200,
            isSuccess: true,
            message: 'this is test api'
        });
    
});



const server = http.createServer(app);

process.on('uncaughtException' , (error , source) => {
    console.log(`uncaughtException: ${error}`);
    console.log(`source: ${source}`);
});

export default server;
