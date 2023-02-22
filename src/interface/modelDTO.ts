export interface ModelDTO {
    model: string;
    modelName: string;
    modelSeq: number;
    price: number;
    quantity: number;
}

export interface ModelPaymentDTO {
    paymentSeq: number;
    orderSeq: number;
    invoiceSeq: number;
    customerName: string;
    orderName: string;
    totalPrice: number;
    status: string;
    models: Array<ModelDTO>;
}

export interface ModelTossPaymentDTO {
    invoiceSeq: number;
    orderId: string;
    paymentKey: string;
}