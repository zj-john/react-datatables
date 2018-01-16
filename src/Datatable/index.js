import React from "react";
import JqueryDatatable from "./components/JqueryDatatable.js";
import BootstrapDatatable from "./components/BootstrapDatatable.js";

export default class ReactDatatable extends React.Component {
    getDatatable() {
      let { theme } = this.props;
      // theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable
      switch(theme) {
        case "bootstrap":
          return <BootstrapDatatable {...this.props}/>;
        default:
          return <JqueryDatatable {...this.props}/>;
      }

    }
    render() {
        return (
          <div>THIS is Datatatable
          </div>
        )
    }
}
