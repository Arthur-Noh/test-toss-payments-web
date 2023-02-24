import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import AppPages from './appPages';

const ViewArea = styled.div<{ width?: number, height?: number }>`
display: flex;
width: ${({ width }) => width ? `${width}px` : `100%`};
height: ${({ height }) => height ? `${height}px` : `100%`};
`;

const AppScreen = observer(() => {
    // const windowSize = useWindowSize();

    return (
        <ViewArea 
            // width={windowSize.width}
            // height={windowSize.height}
        >
            <AppPages />
        </ViewArea>
    );
});

export default AppScreen;