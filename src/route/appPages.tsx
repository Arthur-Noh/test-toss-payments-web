import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRouteDef } from './routeDef';

const AppPages = () => {
    return (
        <BrowserRouter>
            <Routes>
                { Object.entries({ ...AppRouteDef }).map(([ name, { path, element } ], index) => (
                    <Route
                        key={index}
                        path={path}
                        element={element}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default AppPages;