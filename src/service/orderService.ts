import { getModels, postPaymentApprove } from '../constants/envVar';
import { Instance } from '../factories/axiosFactory';
import { ModelPaymentDTO, ModelTossPaymentDTO } from '../interface/modelDTO';
import { ResponseDTO } from '../interface/responseDTO';

class OrderService {
    public async getPaymentData(invoiceSeq: number): Promise<Array<ModelPaymentDTO>> {
        const requestQuery = `invoiceSeq=${invoiceSeq}`;
        const { data, status } = await Instance.get(getModels + '?' + requestQuery);
        return data;
    }

    public async requestPayment(body: ModelTossPaymentDTO): Promise<ResponseDTO> {
        const { data } = await Instance.post(postPaymentApprove, body);
        return data;
    }
}

const orderService = new OrderService();
export default orderService;
