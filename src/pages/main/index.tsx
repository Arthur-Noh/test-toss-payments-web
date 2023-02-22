import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/atoms/button';
import Divider from '../../components/atoms/divider';
import ModelCard from '../../components/atoms/modelCard';
import ToggleButton from '../../components/atoms/toggleButton';
import View from '../../components/atoms/view';
import { SERVER_URL } from '../../constants/domain';
import { DUMMY_DATA, PaymentOptions } from '../../constants/paymentMethod';
import { initInstance } from '../../factories/axiosFactory';
import { localeNumber } from '../../helper/numberHelper';
import { findDonePayment, findReadyPayment } from '../../helper/paymentHelper';
import { scaler } from '../../helper/scaler';
import { defaultURLParamType } from '../../helper/urlHelper';
import { ModelPaymentDTO } from '../../interface/modelDTO';
import orderService from '../../service/orderService';
import mainStore from './store';

const Layout = styled(View)`
flex: 1;
`;

const InnerLayout = styled(View)`
padding: ${({ theme }) => theme.webBase.templatePadding}px;
@media (max-width: 768px) {
    padding: ${({ theme }) => theme.appBase.templatePadding}px;
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

const ModelView = styled(View)`
margin-bottom: 24px;
`;

const DividerGap = styled(View)`
margin-bottom: 20px;
`;

const Main = observer(() => {
    const navigation = useNavigate();
    const params: defaultURLParamType = useParams();

    const initPaymentData = async () => {
        try {
            // host 가 정상적으로 존재할때는 아래 주석을 해제하시면 됩니다.
            // const response = await orderService.getPaymentData(mainStore.invoiceSeq);
            const response = DUMMY_DATA;
            if (response) {
                mainStore.setPaymentData(response);
                validatePayment(response);
            }
        } catch (error: any) {
            console.log('error =>', error);
        }
    };

    // 결제 준비된 송장이 존재하는지 확인합니다.
    const validatePayment = (paymentData: Array<ModelPaymentDTO>) => {
        const validPayment = findReadyPayment(paymentData);
        if (!validPayment) {
            // 이미 결제된 사항이 존재하면
            const donePayment = findDonePayment(paymentData);
            if (donePayment) {
                navigation(`/success/${mainStore.invoiceSeq}`);
                return ;
            }
            console.log('결제 준비된 송장이 존재하지 않습니다.');
            navigation('/NotFound');
            return;
        }
        mainStore.setValidPayment(validPayment);
    };

    const initPaymentInstance = async () => {
        await mainStore.generatePaymentInstance();
    };

    const initParams = (urlParams: defaultURLParamType) => {
        if (!urlParams.invoiceSeq) {
            console.log('주문번호가 존재하지 않습니다!');
            navigation('/NotFound');
            return ;
        }
        // All URL params is valid.
        mainStore.setInvoiceSeq(parseInt(urlParams.invoiceSeq));
    };

    useEffect(() => {
        initParams(params);
        initInstance(SERVER_URL);
        initPaymentData();
        initPaymentInstance();
    }, []);

    return (
        <Layout>
            <InnerLayout>
                <LayoutTitleView>
                    <LayoutTitle>{`${mainStore.validPayment.customerName} 고객님`}</LayoutTitle>
                    <LayoutTitle>결제 페이지</LayoutTitle>
                </LayoutTitleView>

                <SeqView>
                    <SeqText>{`주문번호 : ${mainStore.validPayment.orderSeq}`}</SeqText>
                    <SeqText>{`송장번호 : ${mainStore.validPayment.invoiceSeq}`}</SeqText>
                </SeqView>

                <TitleView>
                    <Title>결제금액</Title>
                </TitleView>

                <ModelView>
                    { mainStore.validPayment.models.map((model, index) => (
                        <ModelCard
                            key={`${model.modelSeq}-${index}`}
                            modelName={model.modelName}
                            price={model.price}
                            quantity={model.quantity}
                        />
                    ))}
                </ModelView>

                <TitleView>
                    <Title>최종결제금액</Title>
                    <Title>{`${localeNumber(mainStore.validPayment.totalPrice)} 원`}</Title>
                </TitleView>
            </InnerLayout>

            <Divider/>
            
            <InnerLayout>
                <TitleView>
                    <Title>결제수단</Title>
                </TitleView>
                <ToggleButton
                    numPerRow={2}
                    value={mainStore.paymentMethod}
                    onChange={mainStore.setPaymentMethod}
                    options={PaymentOptions}
                    size='medium'
                />
            </InnerLayout>

            <DividerGap>
                <Divider/>
            </DividerGap>

            <InnerLayout>
                <Button
                    title={`${localeNumber(mainStore.validPayment.totalPrice)}원 결제하기`}
                    onClick={() => {
                        if (!mainStore.paymentMethod) {
                            console.log('결제 수단을 선택해주세요.');
                            return ;
                        }
                        mainStore.activePaymentInstance(mainStore.paymentMethod);
                    }}
                    size='medium'
                    disabled={mainStore.paymentMethod === undefined}
                />
            </InnerLayout>
        </Layout>
    );
});

export default Main;