import React from 'react';
import { observer } from 'mobx-react';
import {  useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/atoms/button';
import View from '../../../components/atoms/view';
import { scaler } from '../../../helper/scaler';
import { defaultURLParamType } from '../../../helper/urlHelper';

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

const ButtonWrapper = styled(View)`
`;

const Fail = observer(() => {
    const navigation = useNavigate();
    const params: defaultURLParamType = useParams();
    
    return (
        <Layout>
            <MessageBox>
                <BoxLayout>
                    <Title>이런, 결제에 실패했습니다.</Title>
                    <Content>결제 화면에서 오랫동안 대기했거나</Content>
                    <Content>결제사 문제로 결제가 제대로 수행되지 않았습니다.</Content>
                    <Content>다시 시도해주세요.</Content>
                </BoxLayout>
                <ButtonWrapper>
                    <Button
                        title='결제화면으로 돌아가기'
                        onClick={() => navigation(`/main/${params.invoiceSeq}`)}
                        size='medium'
                    />
                </ButtonWrapper>
            </MessageBox>
        </Layout>
    );
});

export default Fail;