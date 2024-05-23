export class ServiceUser {
    private info:Object = {
            'error_data':"",
            'error':false,
            'info':true,
            'data':{}
        }
    constructor() {

    }
    async  login (email:string,password:string):Promise<Object>{
        
        let obj:Object = JSON.parse(localStorage.getItem('todolist'));
        //cargar la ruta
        let url = obj['route'] + "login";               
        if (obj['token'] != ""){
            this.info['error'] = true; 
            this.info['error_data'] = "Hay un usuario registrado en este equipo";
            return this.info;
        };
        //cargar los opt 
        let opt:Object = {
            method:"post",
            body:JSON.stringify({
                'email':email,
                'password':password
            }),
            headers:{
                'content-type':"application/json",
            }
        };
        //hacer el login 
        let response = await window.fetch(url,opt);
        if (!response.ok){//si hay error mostrar el error
            this.info['error_data'] = "Error al procesar la solicitud";
            this.info['error'] = true;
        }else{
            let data = await response.json();
            this.info['error_data'] = data['error'];
            this.info['error'] =!data['status'];
            this.info['info'] = data['status'];
            obj['token'] =  data['token'];
            localStorage.setItem('todolist',JSON.stringify(obj));
            return this.info;
            //ir a la pantalla general

        }
    }
   
    async register(email:string, name:string, password:string):Promise<Object>{
                let url:String = JSON.parse(localStorage.getItem('todolist'))['route'] + 'register';
                let parameter = {
                        'email':email,
                        'name':name,
                        'password':password
                };
                let opt:Object = {
                    method:"post",
                    body: JSON.stringify(parameter),
                    headers:{
                        'content-type':"application/json"
                    }
                }
                let response = await fetch(url,opt);
                if (!response.ok){
                    this.info['error'] = true;
                    this.info['info'] = false;
                    this.info['error_data'] = "No fue posible acceder al sistema";
                }else{
                    let data = await response.json();
                        this.info['error'] = data['status'];
                        this.info['info'] = data['status'];
                        this.info['error_data'] = data['error'];
                }
               return this.info; 
            }
    async close_sesion():Promise<Object>{
        let url:string = JSON.parse(localStorage.getItem('todolist'))['route'] + 'close_session';
        //cargar los opt 
        let opt:Object = {
            method:"get",
            headers:{
                'content-type':"application/json",
                Authorization : 'Bearer ' +  JSON.parse(localStorage.getItem('todolist'))['token']
            }
        };
        let response = await fetch(url,opt);
        if (response.ok){
            let data = await response.json();
            this.info['error'] = data['status'];
            this.info['error_data'] = 'Sesion correctamente cerrada';
            this.info['info'] = data['status'];
        }else{
            this.info['error'] =  true;
            this.info['error_data'] = "Error al intentar conectar con el servidor, se cierra sesion localmente";
            this.info['info'] = false;
        }
        return this.info;
    } 

}
export default ServiceUser
