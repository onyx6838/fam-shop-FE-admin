import React from 'react'
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import store from './redux/store/store';
import Routes from "./routes/Routes";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <ReduxToastr
        timeOut={5000}
        newestOnTop={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  )
}

export default App