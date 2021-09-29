import { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreatePage, EditPage, HomePage, NotFoundPage } from './routes';
import './styles/global.css';

const App: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/create">
        <CreatePage />
      </Route>
      <Route exact path="/edit/:id">
        <EditPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export { App };
