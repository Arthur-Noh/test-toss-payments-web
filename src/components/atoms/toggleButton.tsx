import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { UnknownOption, ComponentSize } from '../../helper/componentHelper';
import View from './view';

const Layout = styled(View)`
flex-direction: row;
flex-flow: wrap;
justify-content: space-between;
/* Disable drag option */
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

const Button = styled(View)<{ width: number, isActive?: boolean, size?: ComponentSize, needBottomGap?: boolean, disabled?: boolean }>`
width: ${({ width }) => width}%;
align-items: center;
justify-content: center;
padding: ${({ theme, size }) =>
    size === 'large' ? theme.webBase.largeComponentPadding :
    size === 'medium' ? theme.webBase.mediumComponentPadding :
    theme.webBase.smallComponentPadding
}px;
background-color: ${({ theme }) => theme.colors.white.base};
border-style: solid;
border-width: 1px;
border-radius: ${({ theme, size }) =>
    size === 'large' ? theme.webBase.largeRadius :
    size === 'medium' ? theme.webBase.mediumRadius :
    theme.webBase.smallRadius
}px;
border-color: ${({ theme, isActive }) => isActive ? theme.colors.primary.blue : theme.colors.gray[300]};
margin-bottom: ${({ needBottomGap }) => needBottomGap ? 10 : 0 }px;
/* For shadow em */
font-size: ${({ theme, size }) => 
    size === 'large' ? theme.webTypography.size.l1 :
    size === 'medium' ? theme.webTypography.size.m1 :
    theme.webTypography.size.s1
}px;
/* For app view */
@media (max-width: 768px) {
    font-size: ${({ theme, size }) => 
        size === 'large' ? theme.appTypography.size.l1 :
        size === 'medium' ? theme.appTypography.size.m1 :
        theme.appTypography.size.s1
    }px;
    padding: ${({ theme, size }) => 
        size === 'large' ? theme.appBase.largeComponentPadding :
        size === 'medium' ? theme.appBase.mediumComponentPadding :
        theme.appBase.smallComponentPadding
    }px;
    border-radius: ${({ theme, size }) => 
        size === 'large' ? theme.appBase.largeRadius :
        size === 'medium' ? theme.appBase.mediumRadius :
        theme.appBase.smallRadius
    }px;
};
box-shadow: 0.09em 0.09em 0.2em ${({ theme }) => theme.colors.gray[400]};
${({ disabled, theme }) => !disabled && `
    :active {
        position: relative;
        top: 2px;
        box-shadow: 0.01em 0.01em 0.1em 0 ${theme.colors.gray[400]};
    };
    :hover {
        cursor: pointer;
    };
`};
`;

const ButtonTitle = styled(View)<{ size?: ComponentSize, isActive?: boolean }>`
font-size: ${({ theme, size }) => 
    size === 'large' ? theme.webTypography.size.l1 :
    size === 'medium' ? theme.webTypography.size.m1 :
    theme.webTypography.size.s1
}px;
color: ${({ theme, isActive }) => isActive ? theme.colors.primary.blue : theme.colors.gray[300]};
@media (max-width: 768px) {
    font-size: ${({ theme, size }) => 
        size === 'large' ? theme.appTypography.size.l1 :
        size === 'medium' ? theme.appTypography.size.m1 :
        theme.appTypography.size.s1
    }px;
};
`;

interface IToggleButton<T> {
    numPerRow: number;
    value: T | undefined;
    options: Array<UnknownOption<T>>;
    onChange: (value: T) => void;
    size?: ComponentSize;
    disabled?: boolean;
}

const ToggleButton = observer(<T extends unknown>(props: IToggleButton<T>) => {
    const buttonWith = useMemo(() => {
        return (
            props.size === 'large' ? 65 :
            props.size === 'medium' ? 75 :
            90 - props.numPerRow * 2) / props.numPerRow;
    }, [ props.numPerRow ]);

    return (
        <Layout>
            { props.options.map((button, index) => {
                const _isActive = props.value === button.value;
                const _needBottomGap = (index + props.numPerRow) < props.options.length;
                return (
                    <Button
                        key={index}
                        width={buttonWith}
                        onClick={() => props.disabled ? undefined : props.onChange(button.value)}
                        isActive={_isActive}
                        needBottomGap={_needBottomGap}
                        size={props.size}
                        disabled={props.disabled}
                    >
                        <ButtonTitle
                            size={props.size}
                            isActive={_isActive}
                        >
                            {button.text}
                        </ButtonTitle>
                    </Button>
                );
            })}
        </Layout>
    )
});

export default ToggleButton;