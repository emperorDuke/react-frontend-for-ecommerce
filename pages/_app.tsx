import React from "react";
import { Provider } from "react-redux";
import App, { Container, AppContext } from "next/app";
import withRedux, { AppProps } from "next-redux-wrapper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import makeStore from "../store";

//////////////////////////////////////////////////////////////////////////////
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
  },
});

class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
