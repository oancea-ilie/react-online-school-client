
export default class Api{
    
    api(path, method ='GET', body= null){
        let url = path;

        const options={
            method,
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            }
        };

        if(body !=null){
            options.body = JSON.stringify(body);
        }

        return fetch(url,options);

    }

    // courses
    async getAll(){
        try{
            const rez = await this.api('http://localhost:5000/api/v1/courses');

            if(rez.status === 200){
                return rez.json();
            }else{
                return 0;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async getById(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/courses/${id}`);

            if(rez.status === 200){
                return rez.json();
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async add(newObj){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/courses`,'POST', newObj);
            
            if(rez.status === 204){
                return "success";

            }else{
                const data = await rez.json();
                return data.error;
            }

         }catch(e){
           
            throw new Error(e);
         }
        
    }

    async update(newObj,id){

        try{
            const rez = await this.api(`http://localhost:5000/api/v1/courses/${id}`,'PUT', newObj);

            if(rez.status === 204){
                return 'update success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async delete(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/courses/${id}`,'DELETE');

            if(rez.status === 204){
                return 'delete success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }


    // students
    async getAllStudents(){
        try{
            const rez = await this.api('http://localhost:5000/api/v1/students');

            if(rez.status === 200){
                return rez.json();
            }else{
                return 0;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async getStudentById(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/students/${id}`);

            if(rez.status === 200){
                return rez.json();
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async addStudent(newObj){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/students`,'POST', newObj);
            
            if(rez.status === 204){
                return "success";

            }else{
                const data = await rez.json();
                return data.error;
            }

         }catch(e){
           
            throw new Error(e);
         }
        
    }

    async updateStudent(newObj,id){

        try{
            const rez = await this.api(`http://localhost:5000/api/v1/students/${id}`,'PUT', newObj);

            if(rez.status === 204){
                return 'update success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async deleteStudent(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/students/${id}`,'DELETE');

            if(rez.status === 204){
                return 'delete success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    // enrolments


    async getAllEnrolments(){
        try{
            const rez = await this.api('http://localhost:5000/api/v1/enrolments');

            if(rez.status === 200){
                return rez.json();
            }else{
                return 0;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async getEnrolmentById(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/enrolments/${id}`);

            if(rez.status === 200){
                return rez.json();
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async addEnrolment(newObj){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/enrolments`,'POST', newObj);
            
            if(rez.status === 204){
                return "success";

            }else{
                const data = await rez.json();
                return data.error;
            }

         }catch(e){
           
            throw new Error(e);
         }
        
    }

    async updateEnrolment(newObj,id){

        try{
            const rez = await this.api(`http://localhost:5000/api/v1/enrolments/${id}`,'PUT', newObj);

            if(rez.status === 204){
                return 'update success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    async deleteEnrolment(id){
        try{
            const rez = await this.api(`http://localhost:5000/api/v1/enrolments/${id}`,'DELETE');

            if(rez.status === 204){
                return 'delete success';
            }else{
                const data = await rez.json();
                return data.error;
            }

        }catch(e){
            throw new Error(e);
        }
        
    }

    
}