import cors from 'cors';
import http from 'http';
import express, { Request, Response } from 'express';
import { logger } from './logs/winston/winston.config';
import BaseRouter from './routes/api';




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
    logger.error('uncaughtException')
});

process.on('unhandledRejection' , (error , source) => {
    logger.error('unhandledRejection')
})

export default server;
