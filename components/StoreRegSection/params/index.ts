import { CustomSelectProps } from "../../CustomForms/CustomSelectHtml";
import { ImageField } from "../../CustomForms/InputTagForImages";





export const storeRegParams: Array<CustomSelectProps> = [
    {
        id: "form-StoreName",
        label: 'Store Name',
        field: 'name',
        type: 'text',
        selectItems: []
    },
    {
        id: "form-StoreAddress",
        label: 'Store Address',
        field: 'address',
        type: 'text',
        selectItems: []
    },
    {
        id: "form-StoreLocation",
        label: 'Store Location',
        field: 'location',
        type: 'select',
        placeholder: 'Region',
        selectItems: [
            { item: 'Lagos' },
            { item: 'Abuja' },
            { item: 'Cross-river' }
        ]
    },
]


export const imageParam: Array<Partial<ImageField>> = [
    {
        key: 1,
        label: 'Store Logo',
        field: 'logo',
        id: "store-logo",
        type: "file",
    }
]
