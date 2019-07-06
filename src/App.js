import React from "react";
import "./App.css";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme";

import auth from "./modules/auth";

import Router from "./ui/components/router";

const client = new AWSAppSyncClient({
  url:
    "https://d746ukrjcrekxopmw6p3ei6leu.appsync-api.us-east-1.amazonaws.com/graphql",
  region: "us-east-1",
  auth: {
    type: "OPENID_CONNECT",
    jwtToken: () => window.localStorage.getItem("AppSyncOIDCKey")
  }
});

const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

const initialState = {
  user: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loginUser":
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        user: action.payload.user
      };
    default:
      return state;
  }
};

const UserContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState.user);
  auth.handleAuthentication().then(() => {
    dispatch({
      type: "loginUser",
      payload: {
        authenticated: true,
        user: auth.getIdToken()
      }
    });
  });
  return (
    <UserContext.Provider
      value={{
        ...state,
        isAuthenticated: window.localStorage.getItem("AppSyncOIDCKey")
          ? true
          : false,
        handleLogin: auth.login
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </ThemeProvider>
    </Rehydrated>
  </ApolloProvider>
);
