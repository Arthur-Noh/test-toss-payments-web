// NOTE
// All this function for App
const basicDimensions = {
    width: 375,
    height: 812,
};

const deviceDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const scaler = (width: number) => {
    const scale = deviceDimensions.width / basicDimensions.width;
    return Math.round(width * scale);
};

const fontScaler = (fontSize: number) => {
    const scale = Math.sqrt(deviceDimensions.height / basicDimensions.height);
    return Math.round(fontSize * scale);
};

export { scaler, fontScaler };

