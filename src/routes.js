// import React from 'react';
// import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
// import {
    // App,
    // Chat,
    // Home,
    // Widgets,
    // About,
    // Login,
    // LoginSuccess,
    // Survey,
    // NotFound,
  // } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  if (typeof require.ensure !== 'function') require.ensure = (deps, cb) => cb(require);
  /**
   * Please keep routes in alphabetical order
   */
  return {
    path: '/',
    component: require('./containers/App/App'),
    indexRoute: {
      component: require('./containers/Home/Home')
    },
    childRoutes: [{
      onEnter: requireLogin,
      childRoutes: [
        {
          path: 'chat',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
             cb(null, require('./containers/Chat/Chat')), 'chat');
          }
        },
        {
          path: 'LoginSuccess',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
             cb(null, require('./containers/LoginSuccess/LoginSuccess')), 'login-success');
          }
        },
      ]
    }, {
      path: 'about',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
         cb(null, require('./containers/About/About')), 'about');
      }
    }, {
      path: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
         cb(null, require('./containers/Login/Login')), 'login');
      }
    }, {
      path: 'survey',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
         cb(null, require('./containers/Survey/Survey')), 'survey');
      }
    }, {
      path: 'widgets',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
         cb(null, require('./containers/Widgets/Widgets')), 'widgets');
      }
    }, {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
         cb(null, require('./containers/NotFound/NotFound')), 'notfound');
      }
    }]
  };

  // return (
  //   <Route path="/" component={App}>
  //     { /* Home (main) route */ }
  //     <IndexRoute component={Home}/>
  //
  //     { /* Routes requiring login */ }
  //     <Route onEnter={requireLogin}>
  //       <Route path="chat" component={Chat}/>
  //       <Route path="loginSuccess" component={LoginSuccess}/>
  //     </Route>
  //
  //     { /* Routes */ }
  //     <Route path="about" component={About}/>
  //     <Route path="login" component={Login}/>
  //     <Route path="survey" component={Survey}/>
  //     <Route path="widgets" component={Widgets}/>
  //
  //     { /* Catch all route */ }
  //     <Route path="*" component={NotFound} status={404} />
  //   </Route>
  // );
};
