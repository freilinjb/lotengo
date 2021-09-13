import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import { Store } from './redux/Store'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ConsorcioProvider } from 'app/contexts/ConsorcioContext';
import { GeneralProvider } from 'app/contexts/GeneralContext';
import { HorarioProvider } from 'app/contexts/HorarioContext';
import { TerminalProvider } from 'app/contexts/TerminalContext';

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <GlobalCss />
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Router history={history}>
                            <AuthProvider>
                                <MatxSuspense>
                                    <ConsorcioProvider>
                                    <GeneralProvider>
                                    <HorarioProvider>
                                    <TerminalProvider>
                                        <Switch>
                                            {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                            {sessionRoutes.map((item, i) => (
                                                <Route
                                                    key={i}
                                                    path={item.path}
                                                    component={item.component}
                                                />
                                            ))}
                                            {/* AUTH PROTECTED DASHBOARD PAGES */}
                                            <AuthGuard>
                                                <MatxLayout />{' '}
                                                {/* RETURNS <Layout1/> component */}
                                            </AuthGuard>
                                        </Switch>
                                    </TerminalProvider>
                                    </HorarioProvider>
                                    </GeneralProvider>
                                    </ConsorcioProvider>
                                </MatxSuspense>
                            </AuthProvider>
                        </Router>
                        </BrowserRouter>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
