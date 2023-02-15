import 'styled-components';
import { ITypography } from './typography';
import { IWhite, IBlack, IGray, IPrimary } from './palette';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            white: IWhite,
            black: IBlack,
            gray: IGray,
            primary: IPrimary,
        };
        webBase: {
            templatePadding: number,
            smallComponentPadding: number,
            mediumComponentPadding: number,
            largeComponentPadding: number,
            smallRadius: number,
            mediumRadius: number,
            largeRadius: number,
        };
        appBase: {
            templatePadding: number,
            smallComponentPadding: number,
            mediumComponentPadding: number,
            largeComponentPadding: number,
            smallRadius: number,
            mediumRadius: number,
            largeRadius: number,
        };
        appTypography: ITypography;
        webTypography: ITypography;
    }
}