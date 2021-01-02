

export type InputWidgetProps = {
    quantity: number;
    index?:number;
    onChange: (qty:number, id?:number) => void;
    height?: number;
}
