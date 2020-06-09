
import * as yup from 'yup';


const ValidateSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required()
});

export default ValidateSchema;