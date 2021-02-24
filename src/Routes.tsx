import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const pages = [
  { path: "/", exact: true, component: () => <p>Hello Home!</p> },
  { path: "/404", exact: true, component: () => <p>Page Not Found</p> },
];

const Routes = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <section className="route-section">
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
            </section>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  </BrowserRouter>
);

export default Routes;
