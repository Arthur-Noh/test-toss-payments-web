import { ModelPaymentDTO } from '../interface/modelDTO';

export type PaymentType = 'card' | 'transfer';

type PaymentOption = {
    text: string,
    value: PaymentType
};

export const PaymentOptions: Array<PaymentOption> = [
    { text: '카드/간편결제', value: 'card' },
    { text: '계좌이체', value: 'transfer' },
];

export const DUMMY_DATA: Array<ModelPaymentDTO> = [
    {
        paymentSeq: 10001,
        orderSeq: 100001321,
        invoiceSeq: 200004112,
        customerName: '테스트 고객 1',
        orderName: '생수',
        totalPrice: 50000,
        status: 'READY',
        models: [
            {
                model: 'samdasu-001',
                modelName: '삼다수',
                modelSeq: 441,
                price: 10000,
                quantity: 3,
            },
            {
                model: 'isis-001',
                modelName: '아이시스',
                modelSeq: 442,
                price: 10000,
                quantity: 2,
            },
        ],
    },
];