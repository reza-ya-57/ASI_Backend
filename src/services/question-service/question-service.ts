
/**
 * get all questions and call another function 
 * on every question
 * @param questionsTables
 * @returns 
 */
export const formattingArrayRowQuesitons = (questionsTables) => {

    return questionsTables.map((row: any) => {
        return formatSingleTableData(row)
    })

}


/**
 * get one question in format of sql recursive table with 
 * all it's children 
 * @param questionTable
 * @returns 
 */
const formatSingleTableData = (questionTable) => {
    const result: any = {
        subQuesitons: []
    }
    const qId = [];
    const qChildId = [];
    questionTable.forEach((row: any) => {
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
                    title: row.ChildButtonCaption,
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

