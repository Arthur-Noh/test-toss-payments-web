import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import View from './view';

const Layout = styled(View)`
border: 3px solid ${({ theme }) => theme.colors.gray[100]};
`;

type DividerType = 'thick' | 'thin';

interface IDivider {
    type?: DividerType; 
}

const Divider: React.FC<IDivider> = observer((props) => {
    return (
        <Layout />
    );
});

export default Divider;