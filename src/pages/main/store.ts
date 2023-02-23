import { runInAction, makeObservable, observable, action, computed } from 'mobx';
import { TossPaymentsInstance } from '@tosspayments/payment-sdk';
import { PaymentType } from '../../constants/paymentMethod';
import { ModelPaymentDTO } from '../../interface/modelDTO';
import { IStore } from '../../helper/storeHelper';
import paymentService from '../../service/paymentService';
import { TEST_CLIENT_KEY } from '../../keys/tossKey';
import { DOMAIN } from '../../constants/domain';

interface IMainStore {
    invoiceSeq: number;
    paymentInstance: TossPaymentsInstance;
    paymentData: Array<ModelPaymentDTO>;
    validPayment: ModelPaymentDTO;
    paymentMethod: PaymentType | undefined;
}

const initialState: IMainStore = {
    invoiceSeq: -1,
    paymentInstance: {} as TossPaymentsInstance,
    paymentData: [],
    validPayment: {
        paymentSeq: -1,
        orderSeq: -1,
        invoiceSeq: -1,
        customerName: '',
        orderName: '',
        totalPrice: -1,
        status: '',
        models: [],
    },
    paymentMethod: undefined,
};

class MainStore implements IStore {
    invoiceSeq = initialState.invoiceSeq;
    paymentInstance = initialState.paymentInstance;
    paymentData = initialState.paymentData;
    validPayment = initialState.validPayment;
    paymentMethod = initialState.paymentMethod;

    constructor() {
        makeObservable(this, {
            invoiceSeq: observable,
            paymentInstance: observable,
            paymentData: observable,
            validPayment: observable,
            paymentMethod: observable,

            setInvoiceSeq: action.bound,
            setPaymentInstance: action.bound,
            setPaymentData: action.bound,
            setValidPayment: action.bound,
            setPaymentMethod: action.bound,

            orderId: computed,

            clear: action.bound,
        });
    };

    async generatePaymentInstance() {
        const instance = await paymentService.generatePaymentInstance(TEST_CLIENT_KEY);
        runInAction(() => {
            this.setPaymentInstance(instance);
        });
    }

    activePaymentInstance(type: PaymentType) {
        switch (type) {
            // 카드/간편결제
            case 'card' :
                this.paymentInstance.requestPayment(
                    '카드',
                    {
                        amount: this.validPayment.totalPrice,
                        orderId: this.orderId,
                        orderName: this.validPayment.orderName,
                        customerName: this.validPayment.customerName,
                        successUrl: `${DOMAIN}/middleSuccess/${this.invoiceSeq}`,
                        failUrl: `${DOMAIN}/fail/${this.invoiceSeq}`,
                    },
                );
                break;
            // 계좌이체
            case 'transfer' :
                this.paymentInstance.requestPayment(
                    '계좌이체',
                    {
                        amount: this.validPayment.totalPrice,
                        orderId: this.orderId,
                        orderName: this.validPayment.orderName,
                        customerName: this.validPayment.customerName,
                        successUrl: `${DOMAIN}/middleSuccess/${this.invoiceSeq}`,
                        failUrl: `${DOMAIN}/fail/${this.invoiceSeq}`,
                    },
                );
                break;
        }
    }

    setInvoiceSeq(invoiceSeq: number) {
        runInAction(() => {
            this.invoiceSeq = invoiceSeq;
        });
    }

    setPaymentInstance(paymentInstance: TossPaymentsInstance) {
        runInAction(() => {
            this.paymentInstance = paymentInstance;
        });
    }

    setPaymentData(paymentData: Array<ModelPaymentDTO>) {
        runInAction(() => {
            this.paymentData = paymentData;
        });
    }

    setValidPayment(validPayment: ModelPaymentDTO) {
        runInAction(() => {
            this.validPayment = validPayment;
        });
    }

    setPaymentMethod(paymentMethod: PaymentType) {
        runInAction(() => {
            this.paymentMethod = paymentMethod;
        });
    }

    get orderId() {
        return `${this.validPayment.orderSeq}`;
    };

    clear() {
        runInAction(() => {
            this.invoiceSeq = initialState.invoiceSeq;
            this.paymentInstance = initialState.paymentInstance;
            this.paymentData = initialState.paymentData;
            this.validPayment = initialState.validPayment;
            this.paymentMethod = initialState.paymentMethod;
        });
    }
}

const mainStore = new MainStore();
export default mainStore;