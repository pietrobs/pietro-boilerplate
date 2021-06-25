import { Button } from "@material-ui/core";
import { Video } from "components/Video";
import AppContext from "contexts/app";
import ActivationCodePage from "pages/ActivationCodePage";
import LogoutPage from "pages/LogoutPage";
import NewExamPage from "pages/NewExamPage";
import React, { useContext } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "templates/Dashboard";

const pages = [
  {
    path: "/",
    exact: true,
    component: NewExamPage,
  },
  {
    path: "/logout",
    exact: true,
    component: LogoutPage,
  },
  { path: "/404", exact: true, component: () => <p>Page Not Found</p> },
];

const Routes = () => {
  const { state } = useContext(AppContext);

  if (!state.activationCode) {
    return <ActivationCodePage />;
  }

  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <Dashboard>
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={500}>
                <Switch location={location}>
                  {pages.map(({ path, exact, component: Component }) => (
                    <Route exact={exact} path={path} component={Component} key={path} />
                  ))}
                  <Redirect
                    to={{
                      pathname: "/404",
                      state: { from: location },
                    }}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </Dashboard>
        )}
      />
    </BrowserRouter>
  );
};

export default Routes;
