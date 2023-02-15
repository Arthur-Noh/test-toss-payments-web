import Default from '../pages/default';
import Main from '../pages/main';

// Main
const MainScreens = {
    Main: {
        path: '/main',
        element: <Main />,
    },
};

// Default
const DefaultScreens = {
    Default: {
        path: '/default',
        element: <Default/>
    }
};

export const AppRouteDef = {
    ...MainScreens,
    ...DefaultScreens,
};