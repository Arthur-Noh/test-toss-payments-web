import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import AppScreen from './route/appScreen';

const App = observer(() => {
    return (
        <ThemeProvider theme={theme}>
            <AppScreen />
        </ThemeProvider>
    );
});

export default App;