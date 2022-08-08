import { Router, Request, Response } from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config()


// Chat router
const router = Router();

// Paths
export const p = {
    equipment: '/get-equipment',
} as const;
  // if (row.ParentId === null) {
        //     if (!result.parent) {
        //         result.parent = {
        //             id: row.Id,
        //             type: row.QuestionTypeId,
        //             number: row.Id,
        //             isEdited: false,
        //             isAnswered: false,
        //             isMandatory: true,
        //             status: 'on',
        //             title: row.Caption
        //         }
        //     }
        // }
        // else {
        //     let childsId = [];
        //     if (!childsId.includes(row.childsId)) {
        //         result.childs.push({

        //         })
        //     }
        // }

const takeOutQuesitonsOptions = (questionRow) => {
    const result: any = {
        subQuesitons: []
    }

    const qId = [];
    const qChildId = [];
    questionRow.forEach((row: any) => {
        if (row.ParentId === null) {
            if (!qId.includes(row.Id)) {
                qId.push(row.Id)
                // result.parent = {
                    result.id = row.Id;
                    result.type = row.QuestionTypeId;
                    result.number = row.Id;
                    result.isEdited = false;
                    result.isAnswered = false;
                    result.isMandatory = true;
                    result.status = 'on';
                    result.title = row.Caption;
                    result.choices = {
                        values: [
                            {
                                id: row.ChoiceId,
                                type: row.ChoiceTypeId,
                                isChoiceAnswered: false,
                                title: row.ChoiceCaption,
                                value: '',
                                display: true
                            }
                        ]
                    }
                // }
            }
            else {
                result.choices.values.push({
                    id: row.ChoiceId,
                    type: row.ChoiceTypeId,
                    isChoiceAnswered: false,
                    title: row.ChoiceCaption,
                    value: '',
                    display: true
                })
            }
        }
        else {
            if (!qChildId.includes(row.Id)) {
                qChildId.push(row.Id);
                result.subQuesitons.push({
                    id: row.Id,
                    type: row.QuestionTypeId,
                    number: row.Id,
                    isEdited: false,
                    isAnswered: false,
                    isMandatory: true,
                    status: 'on',
                    title: row.Caption,
                    choices: {
                        values: [
                            {
                                id: row.ChoiceId,
                                type: row.ChoiceTypeId,
                                isChoiceAnswered: false,
                                title: row.ChoiceCaption,
                                value: '',
                                display: true
                            }
                        ]
                    }
                })
            }
            else {
                result.subQuesitons[qChildId.indexOf(row.Id)].choices.values.push({
                    id: row.ChoiceId,
                    type: row.ChoiceTypeId,
                    isChoiceAnswered: false,
                    title: row.ChoiceCaption,
                    value: '',
                    display: true
                })
            }
        }
    })

    return result;
}

const formattingArrayRowQuesitons = (questionsRow) => {
    // take questions out to the two level parrent and childs
    return questionsRow.map((row: any) => {
        return takeOutQuesitonsOptions(row)
    })
    // const formattedQuesiton = takeOutQuesitonsOptions(questionRow)
    // const result = {
    //     ...levelformatted.parent,
    //     subQuestions: levelformatted.childs
    // }

    // levelformatted.childs.forEach
    // console.log(result)

    // take formatted quesiton object and take in to the hierachy level formatt


    // make formatted object quesiton from quesitons row
    // take quesiton level and quesiton row




}


router.get(p.equipment, async (req: Request, res: Response) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(process.env.DB_STRING)
        const result = await sql.query`EXEC [Base].[GetEquipmentQuestion] @QuestionCategory = 1`
        const questionsRow: any = result.recordsets;
        const formattedQuesitons = formattingArrayRowQuesitons(questionsRow)
        return res.status(200).json({
            questions: formattedQuesitons
        })

        //   res.json(result.recordsets[0])

    } catch (err) {
        // ... error checks
    }
});




// Export router
export default router;