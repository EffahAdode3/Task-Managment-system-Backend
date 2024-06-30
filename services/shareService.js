import Share from '../model/share.js';

export const getSharedToDos = async (clientId) => {
    try {
        const sharedToDos = await Share.findAll({
            where: { Share_With_Client_Id: clientId },
            include: [{
                model: Todolist,
                as: 'Todolist'
            }]
        });
        return sharedToDos.map(share => share.Todolist);
    } catch (error) {
        throw new Error('Error fetching shared to-dos');
    }
};

export const shareTodoList = async (clientIds, todoListId, createdBy) => {
    try {
        const shareTodos = await Promise.all(
            clientIds.map(clientId => 
                Share.create({
                    Share_With_Client_Id: clientId,
                    Todolist_Id: todoListId,
                    Created_By: createdBy,
                })
            )
        );
        return shareTodos;
    } catch (error) {
        throw new Error('Error sharing to-do list');
    }
};

export default { getSharedToDos, shareTodoList}