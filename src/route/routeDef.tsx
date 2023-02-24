import Main from '../pages/main';
import NotFound from '../pages/notFound';
import Fail from '../pages/result/fail';
import MiddleSuccess from '../pages/result/middleSuccess';
import Success from '../pages/result/success';

// Main
const MainScreens = {
    Main: {
        path: '/main/:invoiceSeq',
        element: <Main />,
    },
};

// Result pages
const ResultScreens = {
    Fail: {
        path: '/fail/:invoiceSeq',
        element: <Fail />
    },
    MiddleSuccess: {
        path: '/middleSuccess/:invoiceSeq',
        element: <MiddleSuccess />
    },
    Success: {
        path: '/success/:invoiceSeq',
        element: <Success />
    }
};

// NotFount
const NotFoundScreens = {
    NotFound: {
        path: '*',
        element: <NotFound />
    },
};

export const AppRouteDef = {
    ...MainScreens,
    ...ResultScreens,
    ...NotFoundScreens,
};