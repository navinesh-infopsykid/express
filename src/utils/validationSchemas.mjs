export const createUserValidationSchema ={
    user_name:{
        notEmpty: {
            errorMessage : "User Name must not be empty"
        },
        isLength:{
            options: {min:3, max:12},
            errorMessage: "User name length requirements not met"
        },
        isString:{
            errorMessage:"User name must be string"
        }
    },
    age: {
         notEmpty: {
            errorMessage : "Age must not be empty"
        }
    }
}