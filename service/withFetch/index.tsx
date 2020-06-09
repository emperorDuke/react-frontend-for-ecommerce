import React from "react";
import { WithFetch } from "./@types";
import { ajax } from "rxjs/ajax";
import { map, takeWhile, catchError } from "rxjs/operators";
import { of, Subscription } from "rxjs";

export * from "./@types";

export default function withFetch<P extends { src?: string }>(
  Component: React.ComponentType<WithFetch & Omit<P, "src">>
): React.ComponentType<P> {
  return class extends React.Component<P, WithFetch> {

    req:Subscription | undefined;

    constructor(props: P) {
      super(props);
      this.state = {
        isLoading: true,
        hasLoaded: false,
        item: "",
        loadingError: ""
      };
    }

    componentDidMount() {
      this.req = ajax({
        url: this.props.src,
        method: "get",
        responseType: "blob"
      }).pipe(
        takeWhile(res => res.status === 200),
        map(res => res.response),
        catchError(err => of(err.response))
      ).subscribe({
        next: value =>
          this.setState({
            hasLoaded: true,
            isLoading: false,
            item: window.URL.createObjectURL(new Blob([value]))
          }),
        error: err =>
          this.setState({
            hasLoaded: false,
            isLoading: false,
            loadingError: err
          })
      });
    }

    componentWillUnmount() {
      if (this.req) this.req.unsubscribe();
    }

    render() {
      const { src, ...rest } = this.props;

      return <Component {...this.state} {...rest} />;
    }
  };
}
