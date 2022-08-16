import { Router, Request, Response } from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';
import { formattingArrayRowQuesitons } from '../../services/question-service/question-service';
import { DBError } from '../../errors/DbError/dbError';
import { logger } from '../../logs/winston/winston.config';

dotenv.config()


// Chat router
const router = Router();

// Paths
export const p = {
    equipment: '/get-equipment',
} as const;


router.get(p.equipment, async (req: Request, res: Response) => {

    sql.connect(process.env.DB_STRING, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('EXEC [Base].[GetEquipmentQuestion] @QuestionCategory = 1', function (err, recordset) {
            if (err) console.log(err)
            console.log(recordset)
            // send records as a response
            res.send(recordset);

        });
    });






    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(process.env.DB_STRING)
        const result = await sql.query`EXEC [Base].[GetEquipmentQuestion] @QuestionCategory = 1`
        if (!result.recordset) {
            throw DBError;
        }
        const questionsRow: any = result.recordsets;
        const formattedQuesitons = formattingArrayRowQuesitons(questionsRow)
        return res.status(200).json({
            questions: formattedQuesitons
        })

    } catch (err) {
        // ... error checks
        return res.status(err?.statusCode).json({
            message: err?.message
        })
    }
});




// Export router
export default router;
