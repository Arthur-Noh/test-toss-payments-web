import { loadTossPayments, TossPaymentsInstance } from "@tosspayments/payment-sdk";

class PaymentService {
    public async generatePaymentInstance(clientKey: string): Promise<TossPaymentsInstance> {
        const response = await loadTossPayments(clientKey);
        return response;
    }
}

const paymentService = new PaymentService();
export default paymentService;