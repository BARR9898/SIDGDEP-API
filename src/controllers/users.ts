import { Request,Response, query } from "express"
import { deleteAgent, insertAgent, selectAgent, selectAgents, updateAgent } from "../services/agents";
import { Res as ResponseInterface } from "../interfaces/response/response";
import { handleHttp } from "../middelwares/error.handle";
import { UserFilters,UserFiltersClass } from "../interfaces/users/users.filters";
import { deleteUser, insertUser, selectUser, selectUsers, updateUser } from "../services/users";

const postUser = async ({body} : Request,res:Response) => {
    try {
        const responseItem:ResponseInterface = await insertUser(body);
        res.status(responseItem.code!)
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to create the user')
    }
}

const getUser = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await selectUser(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the agent')
    }
}

const getUsers = async ({body,query} : Request,res:Response) => {
    
    try {
        let newUserFiltersInstance = new UserFiltersClass()
        let filters:UserFilters = newUserFiltersInstance.createFilters(query)
        const responseItem:ResponseInterface = await selectUsers(filters);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to get the users')
    }
}

const putUser = async ({body,params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await updateUser(body,id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to update the agent')
    }
}

const removeUser = async ({params} : Request,res:Response) => {
    try {
        const {id} = params
        const responseItem:ResponseInterface = await deleteUser(id);
        res.send(responseItem); 
    } catch (error) {
        handleHttp(res,'An error ocurred trying to delete the user')
    }
}





export {postUser,getUser,getUsers,putUser,removeUser}