import { Button } from "@material-ui/core";
import { Video } from "components/Video";
import AppContext from "contexts/app";
import ActivationCodePage from "pages/ActivationCodePage";
import ExamListPage from "pages/ExamListPage";
import ExamPage from "pages/ExamPage";
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
    path: "/exam/:elapsedTime?",
    exact: true,
    component: ExamPage,
  },
  {
    path: "/logout",
    exact: true,
    component: LogoutPage,
  },
  {
    path: "/exams",
    exact: true,
    component: ExamListPage,
  },
  { path: "/404", exact: true, component: () => <p>Página não encontrada</p> },
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
            {/* <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
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
            {/* </CSSTransition>
            </TransitionGroup> */}
          </Dashboard>
        )}
      />
    </BrowserRouter>
  );
};

export default Routes;
