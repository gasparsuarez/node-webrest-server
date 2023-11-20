

interface TodoProperties {

}

export class TodoEntity {


    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ) {}    

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject( object: {[key: string]: any}): TodoEntity {
        const {id, text, completedAt} = object;

        if(!id) throw 'id is required';
        if(!text) throw 'text is required';

        let newDate; 
        /// Verificación de dato válido
        if(completedAt){
            newDate = new Date(completedAt);
            if( isNaN( newDate.getTime() ) ){
                throw `${completedAt} is not a valid date`;
            }
        }
        return new TodoEntity(id, text, completedAt);
    }

}