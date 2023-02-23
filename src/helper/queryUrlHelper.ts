const divideQuery = (query: string): Array<string> => {
    const queryValues = query.replace('?', '').split('&');
    return queryValues;
};

const findTargetByQueryArray = (dividedQueries: Array<string>, target: string): string | undefined => {
    return dividedQueries.find(value => value.startsWith(target));
};

const getQueryValue = (singleQueryString: string): string => {
    return singleQueryString.split('=')[1];
};

export const getResultKey = (query: string): string | undefined => {
    const queryValues = divideQuery(query);
    // NOTE: ex) 'paymentKey=****'
    const _resultKey = findTargetByQueryArray(queryValues, 'paymentKey');
    if (!_resultKey) {
        return undefined;
    }
    const resultKey = getQueryValue(_resultKey);
    return resultKey;
};

export const getResultAmount = (query: string): number | undefined => {
    const queryValues = divideQuery(query);
    // NOTE: ex) 'amount=12345'
    const _amount = findTargetByQueryArray(queryValues, 'amount');
    if (!_amount) {
        return undefined;
    }
    const amount = getQueryValue(_amount);
    return parseInt(amount);
};

export const getResultInvoiceSeq = (query: string): string | undefined => {
    const queryValues = divideQuery(query);
    // NOTE: er) 'orderId=12345'
    const _invoiceSeq = findTargetByQueryArray(queryValues, 'orderId');
    if (!_invoiceSeq) {
        return undefined;
    }
    const invoiceSeq = getQueryValue(_invoiceSeq);
    return invoiceSeq;
};
