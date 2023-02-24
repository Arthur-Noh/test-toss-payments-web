import { makeObservable, action, runInAction, observable, computed } from 'mobx';
import { getResultAmount, getResultInvoiceSeq, getResultKey } from '../../helper/queryUrlHelper';
import { ModelPaymentDTO, ModelTossPaymentDTO } from '../../interface/modelDTO';
import { ResponseDTO } from '../../interface/responseDTO';
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

            requestPayment: action.bound,
            clear: action.bound,

            setInvoiceSeq: action.bound,
            setResultValues: action.bound,
            setPaymentData: action.bound,
            setDonePayment: action.bound,

            resultKey: computed,
            resultAmount: computed,
            resultOrderId: computed,
        });
    };

    async requestPayment() {
        // NOTE: You should already validate invoiceSeq & paymentKey.
        const body: ModelTossPaymentDTO = {
            invoiceSeq: this.invoiceSeq,
            orderId: `${this.resultOrderId}`,
            paymentKey: this.resultKey!,
        };
        // const response = await orderService.requestPayment(body);
        const response: ResponseDTO = {
            result: true,
            status: 200,
            code: 'success',
            message: '결제 요청 성공',
            data: {},
        }
        return response;
    }

    setInvoiceSeq(invoiceSeq: number) {
        runInAction(() => {
            this.invoiceSeq = invoiceSeq;
        });
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

    setPaymentData(paymentData: Array<ModelPaymentDTO>) {
        runInAction(() => {
            this.paymentData = paymentData;
        });
    }

    setDonePayment(donePayment: ModelPaymentDTO) {
        runInAction(() => {
            this.donePayment = donePayment;
        });
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
            this.invoiceSeq = initialState.invoiceSeq;
            this._orderId = initialState._orderId;
            this._paymentKey = initialState._paymentKey;
            this._amount = initialState._amount;
            this.paymentData = initialState.paymentData;
            this.donePayment = initialState.donePayment;
        });
    }
}

const resultStore = new ResultStore();
export default resultStore;