import React from 'react';
import MapPage from './MapPage'
import DetailPage from './DetailPage';
import ErrorPage from './ErrorPage';
import AboutPage from './AboutPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import PageMenu from './LayoutComponents/PageMenu'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function Layout() {
    return (
        <div className="App">
            <PageMenu />
            <Router>
                <Switch>
                    <Route exact path="/pse-airquality-react/" component={MapPage} />
                    <Route exact path="/pse-airquality-react/detail/:id" component={DetailPage} />
                    <Route exact path="/pse-airquality-react/about" component={AboutPage} />
                    <Route exact path="/pse-airquality-react/privacy-policy" component={PrivacyPolicyPage} />
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