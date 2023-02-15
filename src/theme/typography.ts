import { fontScaler } from "../helper/scaler";

export interface ITypography {
    weight: {
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
    };
    size: {
        es1: number;
        es2: number;
        es3: number;
        s1: number;
        s2: number;
        s3: number
        m1: number;
        m2: number;
        m3: number;
        l1: number;
        l2: number;
        l3: number;
        el1: number;
        el2: number;
        el3: number;
    };
}

export const webTypography: ITypography = {
    weight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
    },
    size: {
        es1: 9,
        es2: 10,
        es3: 11,
        s1: 12,
        s2: 13,
        s3: 14,
        m1: 15,
        m2: 16,
        m3: 17,
        l1: 18,
        l2: 19,
        l3: 20,
        el1: 21,
        el2: 22,
        el3: 23,
    },
};

export const appTypography: ITypography = {
    weight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
    },
    size: {
        es1: fontScaler(9),
        es2: fontScaler(10),
        es3: fontScaler(11),
        s1: fontScaler(12),
        s2: fontScaler(13),
        s3: fontScaler(14),
        m1: fontScaler(15),
        m2: fontScaler(16),
        m3: fontScaler(17),
        l1: fontScaler(18),
        l2: fontScaler(19),
        l3: fontScaler(20),
        el1: fontScaler(21),
        el2: fontScaler(22),
        el3: fontScaler(23),
    },
};