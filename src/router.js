import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Welcome from './routes/welcome/index';
import dynamic from 'dva/dynamic';


function RouterConfig({ history, app }) {
  const Container = dynamic({
    app,
    models: () => [
      import('./models/CommonModel'),
    ],
    component: () => import('./components/Layout/index'),
  });

  const Login = dynamic({
    app,
    models: () => [
      import('./models/LoginModel'),
    ],
    component: () => import('./routes/login/index'),
  });

  const List = dynamic({
    app,
    models: () => [
      import('./models/ListModel'),
    ],
    component: () => import('./routes/list/index'),
  });

  const Detail = dynamic({
    app,
    models: () => [
      import('./models/ListModel'),
    ],
    component: () => import('./routes/list/detail'),
  });

  const example = dynamic({
    app,
    models: () => [
      import('./models/ExampleModel'),
    ],
    component: () => import('./routes/example'),
  });


  return (
    <Router history={history}>
      <ConfigProvider locale={zhCN}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Container>
          <Route path="/Welcome" exact component={Welcome} />
          <Route path="/List" exact component={List} />
          <Route path="/example" exact component={example} />
          <Route path="/Detail" exact component={Detail} />
          
        </Container>
      </Switch>
      </ConfigProvider>
    </Router>
  );
}

export default RouterConfig;
