import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import View from '../../../components/atoms/view';
import { scaler } from '../../../helper/scaler';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { defaultURLParamType } from '../../../helper/urlHelper';
import resultStore from '../store';
import { SERVER_URL } from '../../../constants/domain';
import { initInstance } from '../../../factories/axiosFactory';

const Layout = styled(View)`
flex: 1;
align-items: center;
justify-content: center;
@media (max-width: 768px) {
    padding: ${({ theme }) => theme.appBase.templatePadding}px;
};
`;

const MessageBox = styled(View)`
`;

const BoxLayout = styled(View)`
align-items: center;
margin-bottom: 16px;
@media (max-width: 768px) {
    margin-bottom: ${scaler(16)};
};
`;

const Title = styled.div`
font-size: ${({ theme }) => theme.webTypography.size.el3}px;
font-weight: ${({ theme }) => theme.webTypography.weight.bold};
color: ${({ theme }) => theme.colors.primary.blue};
text-align: center;
margin-bottom: 24px;
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.el3}px;
    margin-bottom: ${scaler(12)}px;
};
`;

const Content = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.l1}px;
color: ${({ theme }) => theme.colors.black[100]};
text-align: center;
margin-bottom: 8px;
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.m1}px;
    margin-bottom: ${scaler(4)}px;
};
`;

const MiddleSuccess = observer(() => {
    const navigation = useNavigate();
    const params: defaultURLParamType = useParams();
    const location = useLocation();

    const initQueryValue = (query: string) => {
        const result = resultStore.setResultValues(query);
        return result;
    };

    const sendRequest = async () => {
        try {
            const response = await resultStore.requestPayment();
            if (response.status === 200) {
                // navigation(`/success/${resultStore.invoiceSeq}`);
                setTimeout(() => navigation(`/success/${resultStore.invoiceSeq}`), 5000);
            }
        } catch (error: any) {
            console.log('error =>', error);
            alert('결제 요청에 실패했습니다!');
            navigation('/NotFound');
        }
    };

    useEffect(() => {
        const validate = initQueryValue(location.search);
        if (!validate) {
            navigation('/NotFound');
            return ;
        }
        if (!params.invoiceSeq) {
            navigation('/NotFound');
            return ;
        }
        // All URL is valid, now start to request our server.
        resultStore.setInvoiceSeq(parseInt(params.invoiceSeq));
        initInstance(SERVER_URL);
        sendRequest();
    }, []);

    return (
        <Layout>
            <MessageBox>
                <BoxLayout>
                    <Title>결제가 진행중입니다.</Title>
                    <Content>잠시만 기다려주세요.</Content>
                </BoxLayout>
            </MessageBox>
        </Layout>
    );
});

export default MiddleSuccess;