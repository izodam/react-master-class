import { Component, ReactNode } from "react";
import { Helmet } from "react-helmet";

class HelmetComponent extends Component {
  render(): ReactNode {
    return (
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
            rel="stylesheet"
          />
        </Helmet>
      </>
    );
  }
}
export default HelmetComponent;
