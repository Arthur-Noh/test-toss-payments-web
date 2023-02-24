import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import View from '../../../components/atoms/view';
import { scaler } from '../../../helper/scaler';
import { defaultURLParamType } from '../../../helper/urlHelper';
import CompleteImage from '../../../assets/success/complete.png';
import resultStore from '../store';
import ModelCard from '../../../components/atoms/modelCard';
import { localeNumber } from '../../../helper/numberHelper';
import { findDonePayment } from '../../../helper/paymentHelper';
import { ModelPaymentDTO } from '../../../interface/modelDTO';
import orderService from '../../../service/orderService';
import { useEffect } from 'react';
import { initInstance } from '../../../factories/axiosFactory';
import { SERVER_URL } from '../../../constants/domain';
import { DUMMY_DATA } from '../../../constants/paymentMethod';

const Layout = styled(View)`
flex: 1;
`;

const InnerLayout = styled(View)`
padding: ${({ theme }) => theme.webBase.templatePadding}px;
@media (max-width: 768px) {
    padding: ${({ theme }) => theme.appBase.templatePadding}px;
};
`;

const CompleteView = styled(View)`
align-items: center;
margin-bottom: 24px;
@media (max-width: 768px) {
    margin-bottom: ${scaler(16)}px;
};
`;

const Complete = styled.img`
width: 50px;
height: 50px;
@media (max-width: 768px) {
    width: ${scaler(25)}px;
    height: ${scaler(25)}px;
};
`;

const LayoutTitleView = styled(View)`
align-items: center;
margin-bottom: 32px;
@media (max-width: 768px) {
    margin-bottom: ${scaler(24)}px;
};
`;

const LayoutTitle = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.el1}px;
font-weight: ${({ theme }) => theme.webTypography.weight.semiBold};
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.el1}px;
};
`;

const TitleView = styled(View)`
flex-direction: row;
justify-content: space-between;
margin-bottom: 12px;
@media (max-width: 768px) {
    margin-bottom: ${scaler(8)}px;
};
`;

const Title = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m3}px;
font-weight: ${({ theme }) => theme.webTypography.weight.semiBold};
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.m3}px;
};
`;

const SeqText = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m1}px;
color: ${({ theme }) => theme.colors.black[100]};
`;

const SeqView = styled(View)`
margin-bottom: 12px;
`;

const ExtraModelView = styled(View)`
margin-bottom: 24px;
`;

const StatusTextView = styled(View)`
align-items: flex-end;
`;

const StatusText = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m1}px;
color: ${({ theme }) => theme.colors.gray[500]};
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.m1}px;
}
`;

const Success = observer(() => {
    const navigation = useNavigate();
    const params: defaultURLParamType = useParams();

    const initParams = (urlParams: defaultURLParamType) => {
        if (!urlParams.invoiceSeq) {
            navigation('/NotFound');
            return ;
        }
        // All URL params is valid.
        resultStore.setInvoiceSeq(parseInt(urlParams.invoiceSeq));
    };

    // 결제 완료된 송장이 존재하는지 확인합니다.
    const validatePayment = (paymentData: Array<ModelPaymentDTO>) => {
        const donePayment = findDonePayment(paymentData);
        if (!donePayment) {
            navigation('/NotFound');
            return;
        }
        resultStore.setDonePayment(donePayment);
    };

    const initPaymentData = async () => {
        try {
            const response = DUMMY_DATA;
            // const response = await orderService.getPaymentData(resultStore.invoiceSeq);
            if (response) {
                resultStore.setPaymentData(response);
                validatePayment(response);
            }
        } catch (error: any) {
            console.log('error =>', error);
        }
    };

    useEffect(() => {
        initParams(params);
        initInstance(SERVER_URL);
        initPaymentData();
    }, []);

    return (
        <Layout>
            <InnerLayout>
                <CompleteView>
                    <Complete src={CompleteImage}/>
                </CompleteView>
                <LayoutTitleView>
                    <LayoutTitle>{`${resultStore.donePayment.customerName} 고객님`}</LayoutTitle>
                    <LayoutTitle>결제가 완료되었습니다.</LayoutTitle>
                </LayoutTitleView>

                <SeqView>
                    <SeqText>{`주문번호 : ${resultStore.donePayment.orderSeq}`}</SeqText>
                    <SeqText>{`송장번호 : ${resultStore.donePayment.invoiceSeq}`}</SeqText>
                    <SeqText>{`결제번호 : ${resultStore.donePayment.paymentSeq}`}</SeqText>
                </SeqView>

                <TitleView>
                    <Title>결제내역</Title>
                </TitleView>
                <ExtraModelView>
                    { resultStore.donePayment.models.map((model, index) => (
                        <ModelCard
                            key={`${model.modelSeq}-${index}`}
                            modelName={model.modelName}
                            price={model.price}
                            quantity={model.quantity}
                        />
                    ))}
                </ExtraModelView>

                <TitleView>
                    <Title>최종결제금액</Title>
                    <Title>{`${localeNumber(resultStore.donePayment.totalPrice)} 원`}</Title>
                </TitleView>

                <StatusTextView>
                    <StatusText>결제완료</StatusText>
                </StatusTextView>
            </InnerLayout>
        </Layout>
    );
});

export default Success;