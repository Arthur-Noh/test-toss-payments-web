import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ComponentSize } from '../../helper/componentHelper';

const Layout = styled.div<{ size?: ComponentSize, inverse?: boolean, disabled?: boolean }>`
display: flex;
align-items: center;
justify-content: center;
padding: ${({ theme, size }) => 
    size === 'large' ? theme.webBase.largeComponentPadding :
    size === 'medium' ? theme.webBase.mediumComponentPadding :
    theme.webBase.smallComponentPadding
}px;
background-color: ${({ theme, inverse, disabled }) =>
    inverse ?
        theme.colors.white.base :
        ( disabled ? theme.colors.gray[300] : theme.colors.primary.blue )
};
border-style: ${({ inverse }) => inverse ? 'solid' : 'none'};
border-width: ${({ inverse }) => inverse ? 1 : 0}px;
border-radius: ${({ theme, size }) => 
    size === 'large' ? theme.webBase.largeRadius :
    size === 'medium' ? theme.webBase.mediumRadius :
    theme.webBase.smallRadius
}px;
border-color: ${({ theme, inverse, disabled }) =>
    inverse ?
        ( disabled ? theme.colors.gray[300] : theme.colors.primary.blue ) :
        'transparent'
};
/* For app view */
@media (max-width: 768px) {
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
/* For shadow em */
font-size: ${({ theme, size }) => 
    size === 'large' ? theme.webTypography.size.l1 :
    size === 'medium' ? theme.webTypography.size.m1 :
    theme.webTypography.size.s1
}px;
box-shadow: 0.09em 0.09em 0.2em ${({ theme }) => theme.colors.gray[400]};
${({ disabled, theme }) => !disabled && `
    :active {
        position: relative;
        top: 2px;
        box-shadow: 0.01em 0.01em 0.1em 0 ${theme.colors.gray[400]};
    }
    :hover {
        cursor: pointer;
    };
`}
/* Disable drag option */
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

const ButtonTitle = styled.div<{ size?: ComponentSize, inverse?: boolean, disabled?: boolean }>`
font-size: ${({ theme, size }) => 
    size === 'large' ? theme.webTypography.size.l1 :
    size === 'medium' ? theme.webTypography.size.m1 :
    theme.webTypography.size.s1
}px;
color: ${({ theme, inverse, disabled }) =>
    inverse ?
        ( disabled ? theme.colors.gray[300] : theme.colors.primary.blue ) :
        theme.colors.white.base
};
/* For app view */
@media (max-width: 768px) {
    font-size: ${({ theme, size }) => 
        size === 'large' ? theme.appTypography.size.l1 :
        size === 'medium' ? theme.appTypography.size.m1 :
        theme.appTypography.size.s1
    }px;
};
`;

interface IButton {
    title: string;
    onClick?: () => void;
    size?: ComponentSize;
    inverse?: boolean;
    disabled?: boolean;
}

const Button: React.FC<IButton> = observer((props) => {
    return (
        <Layout
            size={props.size}
            inverse={props.inverse}
            disabled={props.disabled}
            onClick={!props.disabled ? props.onClick : undefined}
        >
            <ButtonTitle
                size={props.size}
                inverse={props.inverse}
                disabled={props.disabled}
            >
                {props.title}
            </ButtonTitle>
        </Layout>
    );
});

export default Button;