class ServiceActivity {
    public out = {
        'data':[],
        'error':false,
        'error_data':"",
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
    async Sremove(idactivity:string,idtask:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist')); 
        let url = obj['route'] + 'activity_delete';
        let opt = {
            method:"delete",
            body:JSON.stringify({'idactivity':idactivity,'task_idtask':idtask}),
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response:Object = await fetch(url,opt);
        return await this.set_response(response);
    }
    
    async Screate(detailActivity:string,start:string,finish:string,proyect_idproyect:string,task_idtask:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'activity_create';
        let opt:Object = {
            method:"put",
            body:JSON.stringify({
                'detailActivity':detailActivity,
                'start':start,
                'proyect_idproyect':proyect_idproyect,
                'task_idtask':task_idtask,
                'finish':finish
            }),
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response:Object = await fetch(url,opt);
        return await this.set_response(response);
    }
    
    async Smodify(detailActivity:string,start:string,finish:string,idactivity:string,task_idtask:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'activity_modify';
        let opt:Object = {
            method:"post",
            body:JSON.stringify({
                'detailActivity':detailActivity,
                'start':start,
                'idactivity':idactivity,
                'task_idtask':task_idtask,
                'finish':finish
            }),
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response:Object = await fetch(url,opt);
        return await this.set_response(response);
    }
    async Sget_list(idtask:string):Promise<Object>{
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        let url:string = obj['route'] + 'get_activity?task_idtask=' + idtask;
        let opt:Object = {
            method:"get",
            headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  obj['token']
            }
        }
        let response:Object = await fetch(url,opt);
        return await this.set_response(response);
    }
    
}
export default ServiceActivity;
