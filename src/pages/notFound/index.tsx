import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Layout = styled.div`
display: flex;
flex: 1;
flex-direction: column;
align-items: center;
justify-content: center;
@media (max-width: 768px) {
    padding: ${({ theme }) => theme.appBase.templatePadding}px;
};
`;

const Box = styled.div`
display: flex;
flex-direction: column;
/* padding: ${({ theme }) => theme.webBase.templatePadding}px; */
`;

const BoxLayout = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 16px;
`;

const Title = styled.div`
font-size: ${({ theme }) => theme.webTypography.size.el3}px;
font-weight: ${({ theme }) => theme.webTypography.weight.bold};
color: ${({ theme }) => theme.colors.primary.blue};
text-align: center;
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.el3}px;
};
margin-bottom: 24px;
`;

const Content = styled.div`
font-size: ${({ theme }) => theme.webTypography.size.l1}px;
color: ${({ theme }) => theme.colors.black[100]};
text-align: center;
@media (max-width: 768px) {
    font-size: ${({ theme }) => theme.appTypography.size.m1}px;
};
margin-bottom: 8px;
`;

const NotFound = observer(() => {
    return (
        <Layout>
            <Box>
                <BoxLayout>
                    <Title>이런! 페이지를 찾을 수 없습니다.</Title>
                    <Content>찾으시는 페이지가 존재하지 않습니다.</Content>
                    <Content>입력하신 페이지의 주소가 정확한지 다시 확인해주세요.</Content>
                </BoxLayout>
            </Box>
        </Layout>
    );
});

export default NotFound;