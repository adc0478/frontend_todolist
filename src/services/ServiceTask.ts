class ServiceTask{
   private info = {
       'error':false,
       'error_data':"",
       'info':false,
       'data':[]
   }
    async create (name:string, idproyect:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + "task_create";
        let opt ={
            method:'put',
            body:JSON.stringify({'name':name,'proyect_idproyect':idproyect}),
            headers:{
                'content-type':"application/json",
                Authorization : 'Bearer ' +  obj['token']                    }
        }
        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['error'] = data['status'];
            this.info['info'] = data['status'];
            this.info['error_data'] = data['error'];
            this.info['data'] = data['data'];
        }else{
            this.info['error'] = true;
            this.info['error_data'] = "Error al conectar con el servidor";
            this.info['info'] = false;
        } 
        return this.info;
   }
   async modify(name:string, idproyect:string, idtask:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + "task_modify";
        let opt ={
            method:'post',
            body:JSON.stringify({'name':name,'proyect_idproyect':idproyect, 'idtask':idtask}),
            headers:{
                'content-type':"application/json",
                Authorization : 'Bearer ' +  obj['token']                    }
        }
        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['error'] = data['status'];
            this.info['info'] = data['status'];
            this.info['error_data'] = data['error'];
            this.info['data'] = data['data'];
        }else{
            this.info['error'] = true;
            this.info['error_data'] = "Error al conectar con el servidor";
            this.info['info'] = false;

        }
        return this.info;
   }
    async delete (idtask:string, idproyect:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + "task_delete";
        let opt ={
            method:'delete',
            body:JSON.stringify({'idtask':idtask, 'proyect_idproyect':idproyect}),
            headers:{
                'content-type':"application/json",
                Authorization : 'Bearer ' +  obj['token']                    }
        }
        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['error'] = data['status'];
            this.info['info'] = data['status'];
            this.info['error_data'] = data['error'];
            this.info['data'] = data['data'];
        }else{
            this.info['error'] = true;
            this.info['error_data'] = "Error al conectar con el servidor";
            this.info['info'] = false;

        }

        return this.info;
   }
    async list(idproyect:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'get_task?idproyect=' + idproyect;
        let opt:Object = {
            method:"get",
            headers:{
                'content-type':"application/json",
                Authorization : 'Bearer ' +  obj['token']  
            }
        }
        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['data'] = data['data'];
        }
        return this.info;
    }

}
export default ServiceTask;
