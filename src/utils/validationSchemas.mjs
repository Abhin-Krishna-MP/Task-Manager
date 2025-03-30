export const taskValidationSchema = {
    title : {
        isString:{
            errorMessage : "It should be string"
        },
        isLength : {
            options:{
                max:20,
                min:4
            },
            errorMessage: "Title must be between 4-20 characters"
        },
        notEmpty:{
            errorMessage : "Title cannot be left empty"
        }
    },
    description : {
        isString:{
            errorMessage : "It should be string"
        }
    }
}

export const userValidationSchema = {
    username : {
        isString:{
            errorMessage : "It should be string"
        },
        isLength : {
            options: {
                max : 8,
                min : 4
            },
            errorMessage: "the length must be between 4-8"
        },
        notEmpty:{
            errorMessage : "description cannot be left empty"
        }
    },
    password : {
        isString:{
            errorMessage : "It should be string"
        },
        isLength : {
            options: {
                max : 8,
                min : 4
            },
            errorMessage: "the length must be between 4-8"
        },
        notEmpty:{
            errorMessage : "description cannot be left empty"
        }
    },
    displayName : {
        isString:{
            errorMessage : "It should be string"
        },
        notEmpty:{
            errorMessage : "description cannot be left empty"
        }
    }
}