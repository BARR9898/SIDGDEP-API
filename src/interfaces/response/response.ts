

export interface Res{
    error:boolean,
    result: boolean
    data: any ,
    message?: string,
    code?:number

}

export class ResClass {

    public CreateNewResponse(error:false,data:any,result:boolean,message?:string){
        let response:Res = {
            error: error,
            result: result,
            data: data,
            message: '',
            code:0
        }

        return response
    }
}