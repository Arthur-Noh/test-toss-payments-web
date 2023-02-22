import { ModelPaymentDTO } from '../interface/modelDTO';

export const findReadyPayment = (paymentData: Array<ModelPaymentDTO>): ModelPaymentDTO | undefined => {
    const foundPayment = paymentData.find(data => data.status === 'READY');
    return foundPayment;
};

export const findDonePayment = (paymentData: Array<ModelPaymentDTO>): ModelPaymentDTO | undefined => {
    const foundPayment = paymentData.find(data => data.status === 'DONE');
    return foundPayment;
};