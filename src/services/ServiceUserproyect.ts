export class ServiceUserproyect{
    private out:Object ={
       'error':false,
       'error_data':"",
       'data':[],
       'info':false
    }
    async set_response(response:Object):Promise<Object>{
        if (response.ok){
            let data:Object = await response.json(); 
            this.out['error'] = !data['status'];
            this.out['info'] = data['status'];
            this.out['error_data'] = data['error'];
            this.out['data'] = data['data'];
        }else{
            this.out['error'] = true;
            this.out['error_data'] = "Error al procesar la solicitud";
        } 
        return this.out;
    }

    async get_user(idproyect:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'get_user_proyect?idproyect=' + idproyect;
        let opt:Object = {
            method:'get',
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response = await fetch(url,opt);

        return await this.set_response(response);
    }
    async set_user_type(Userid:string,proyectid:string,type:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'user_proyect_create';
        let opt:Object = {
            method:'put',
            body:JSON.stringify({
                'user_id':Userid,
                'proyect_idproyect':proyectid,
                'type':type
            }),
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response = await fetch(url,opt);
        return this.set_response(response);
    }
    async modify_user_type(id_user_proyect:string,type:string,proyect_idproyect:string):Promise<Object>{
        console.log(type);
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'user_proyect_modify';
        let opt:Object = {
            method:'put',
            body:JSON.stringify({
                'id_user_proyect':id_user_proyect,
                'type':type,
                'proyect_idproyect':proyect_idproyect
            }),
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response = await fetch(url,opt);
        return this.set_response(response);
    }
}
export default ServiceUserproyect
