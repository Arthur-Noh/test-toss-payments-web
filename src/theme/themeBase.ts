import { appTypography, webTypography } from './typography';
import { scaler } from '../helper/scaler';
import { white, black, gray, primary } from './palette';

const colors = {
    white,
    black,
    gray,
    primary,
};

const webBase = {
    templatePadding: 16,
    smallComponentPadding: 12,
    mediumComponentPadding: 16,
    largeComponentPadding: 24,
    smallRadius: 4,
    mediumRadius: 8,
    largeRadius: 12,
};

const appBase = {
    templatePadding: scaler(16),
    smallComponentPadding: scaler(8),
    mediumComponentPadding: scaler(12),
    largeComponentPadding: scaler(16),
    smallRadius: scaler(4),
    mediumRadius: scaler(8),
    largeRadius: scaler(12),
};

export default {
    colors,
    webBase,
    appBase,
    appTypography,
    webTypography,
};