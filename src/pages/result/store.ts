import { makeObservable, action, runInAction, observable } from 'mobx';
import { getResultAmount, getResultInvoiceSeq, getResultKey } from '../../helper/queryUrlHelper';
import { ModelPaymentDTO, ModelTossPaymentDTO } from '../../interface/modelDTO';
import orderService from '../../service/orderService';
import { IStore } from './../../helper/storeHelper';

interface IResultStore {
    invoiceSeq: number;
    _orderId: string | undefined;
    _paymentKey: string | undefined;
    _amount: number | undefined;
    paymentData: Array<ModelPaymentDTO>;
    donePayment: ModelPaymentDTO;
}

const initialState: IResultStore = {
    invoiceSeq: -1,
    _orderId: undefined,
    _paymentKey: undefined,
    _amount: undefined,
    paymentData: [],
    donePayment: {
        paymentSeq: -1,
        orderSeq: -1,
        invoiceSeq: -1,
        customerName: '',
        orderName: '',
        totalPrice: -1,
        status: '',
        models: [],
    },
};

class ResultStore implements IStore {
    invoiceSeq = initialState.invoiceSeq;
    _orderId = initialState._orderId;
    _paymentKey = initialState._paymentKey;
    _amount = initialState._amount;
    paymentData = initialState.paymentData;
    donePayment = initialState.donePayment;

    constructor() {
        makeObservable(this, {
            invoiceSeq: observable,
            _orderId: observable,
            _paymentKey: observable,
            _amount: observable,
            paymentData: observable,
            donePayment: observable,

            clear: action.bound,
        });
    };

    async requestPayment() {
        // NOTE: You should already validate invoiceSeq & paymentKey.
        const body: ModelTossPaymentDTO = {
            invoiceSeq: this.invoiceSeq,
            orderId: `${this.resultOrderId}`,
            paymentKey: this.resultKey!,
        };
        // console.log('body =>', body);
        const response = await orderService.requestPayment(body);
        return response;
    }
    private setResultKey(key: string) {
        runInAction(() => {
            this._paymentKey = key;
        });
    }

    private setResultAmount(amount: number) {
        runInAction(() => {
            this._amount = amount;
        });
    }

    private setResultOrderId(orderId: string) {
        runInAction(() => {
            this._orderId = orderId;
        });
    }

    setResultValues(query: string): boolean {
        const resultKey = getResultKey(query);
        const resultAmount = getResultAmount(query);
        const resultOrderId = getResultInvoiceSeq(query);

        if (!resultKey || !resultAmount || !resultOrderId) {
            return false;
        }
        // Valid key, amount, invoiceSeq
        this.setResultKey(resultKey);
        this.setResultAmount(resultAmount);
        this.setResultOrderId(resultOrderId);
        return true;
    }

    get resultKey() {
        return this._paymentKey;
    };

    get resultAmount() {
        return this._amount;
    };

    get resultOrderId() {
        return this._orderId;
    };

    clear () {
        runInAction(() => {

        });
    }
}