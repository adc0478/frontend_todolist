class proyecto {
    private name:string;
    private info = {
        'error':false,
        'error_data':"",
        'info':false,
        'data':[]
    }
    constructor() {
        
    }
    getName(){
        return this.name;
    }
    async proyect_delete(id:string):Promise<Object>{
        let url:string = JSON.parse(localStorage.getItem('todolist'))['route'] + "proyect_delete";
        let values:string[] = id.split('#'); 
        let opt:object = {
                    method:'delete',
                    body:JSON.stringify({'proyect_idproyect':values[0]}),
                    headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  JSON.parse(localStorage.getItem('todolist'))['token']
                    }
                }

        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['error'] = !data['status'];
            this.info['info'] = data['status'];
            this.info['error_data'] = data['error'];
            this.info['data'] = data['data'];
        }else{
            this.info['error'] = true;
            this.info['info'] = false;
            this.info['error_data'] = "Error  al contactar con el  servidor";
        }
        return this.info;
    }
    async list_proyect():Promise<Object>{
        
        let url:string = JSON.parse(localStorage.getItem('todolist'))['route'] + "list_custon_proyect";
        let opt:object = {
                    method:'get',
                    headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  JSON.parse(localStorage.getItem('todolist'))['token']
                    }
                }

        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['data'] = data['data'];
        }
        return this.info;
    }
    async create_proyect(name:string):Promise<Object>{
        let destiny = 'proyect_create';
                let method = "put";
                let url:string = JSON.parse(localStorage.getItem('todolist'))['route'] + destiny;
                let opt:object = {
                    method:method,
                    body:JSON.stringify({'name':name}),
                    headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  JSON.parse(localStorage.getItem('todolist'))['token']
                    }
                }
                let response = await fetch(url,opt);
                if (response.ok){
                   //obtener el json
                   let data_response = await response.json();
                    //informar que se registra ok o no 
                    this.info['error'] = !data_response['status'];
                    this.info['info'] = data_response['status'];
                    this.info['error_data'] = data_response['error'];
                    this.info['data'] = data_response['data'];
                }else{
                   //informar el error
                    this.info['error'] = true;
                    this.info['error_data'] = "Error al intentar acceder al servidor";
                }

        return this.info;
    }
}
export default proyecto;
