import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { localeNumber as localeNumber } from '../../helper/numberHelper';
import View from './view';

const Layout = styled(View)`
padding: 12px 0;
border-bottom-style: solid;
border-bottom-width: 1px;
border-bottom-color: ${({ theme }) => theme.colors.gray[300]};
`;

const ModelName = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m1}px;
color: ${({ theme }) => theme.colors.black[100]};
margin-bottom: 8px;
`;

const BottomLayout = styled(View)`
flex-direction: row;
`;

const Price = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m1}px;
font-weight: ${({ theme }) => theme.webTypography.weight.semiBold};
color: ${({ theme }) => theme.colors.black[100]};
`;

const Gap = styled(View)`
border-style: solid;
border-width: 1px;
border-color: ${({ theme }) => theme.colors.gray[300]};
height: 12px;
margin: 0 12px;
`;

const Quantity = styled(View)`
font-size: ${({ theme }) => theme.webTypography.size.m1}px;
color: ${({ theme }) => theme.colors.black[100]};
`;

interface IModelCard {
    modelName: string;
    price: number;
    quantity: number;
}

const ModelCard: React.FC<IModelCard> = observer((props) => {
    return (
        <Layout>
            <ModelName>{props.modelName}</ModelName>
            <BottomLayout>
                <Price>{`${localeNumber(props.price)} 원`}</Price>
                <Gap />
                <Quantity>{`${props.quantity} 개`}</Quantity>
            </BottomLayout>
        </Layout>
    );
});

export default ModelCard;