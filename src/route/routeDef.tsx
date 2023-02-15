import Default from '../pages/default';
import Main from '../pages/main';
import NotFound from '../pages/notFound';

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

// NotFount
const NotFoundScreens = {
    NotFound: {
        path: '*',
        element: <NotFound />
    },
};

export const AppRouteDef = {
    ...MainScreens,
    ...DefaultScreens,
    ...NotFoundScreens,
};