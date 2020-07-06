import React from 'react';
import MapPage from './MapPage'
import DetailPage from './DetailPage';
import ErrorPage from './ErrorPage';
import AboutPage from './AboutPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function Layout() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={MapPage} />
                    <Route exact path="/detail/:id" component={DetailPage} />
                    <Route exact ptah="/about" component={AboutPage} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
                    {/* If no url pattern matches an error page is shown */}
                    <Route>
                        {/* Todo: Error message sollte in mehreren Sprachen abrufbar sein */}
                        <ErrorPage code={404} message="page not found" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Layout;