


export const validateRegisterUserSchema = (values) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    }
    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Password must match';
    }
    return errors

};