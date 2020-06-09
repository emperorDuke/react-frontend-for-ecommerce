import { CustomInputProps } from "../../CustomForms/CustomInputHtml";




export const regParams: Array<CustomInputProps> = [
    {
        id: "formFirstName",
        label: 'First Name',
        type: "text",
        field: "first_name",
    },
    {
        id: "formMiddleName",
        label: 'Middle name',
        type: "text",
        field: "middle_name",
    },
    {
        id: "formLastName",
        label: 'Last name',
        type: "text",
        field: "last_name",
    },
    {
        id: "formAddress",
        label: 'Address',
        type: "text",
        field: "address",
    },
    {
        id: "formPhonenumber",
        label: 'Phone number',
        type: "text",
        field: "phone_number",
    },
    {
        id: "formEmail",
        label: 'Email',
        type: "email",
        field: "email",
    },
    {
        id: "formPassword",
        label: 'Password',
        type: "password",
        field: "password",
    },
    {
        id: "formConfirmPassword",
        label: 'Confirm password',
        type: "password",
        field: "confirm_password",
    }
];