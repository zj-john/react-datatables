import React from "react";
import ReactDOM from 'react-dom';
//
// import JqueryDatatable from "./Datatable/components/JqueryDatatable.js";
// import BootstrapDatatable from "./Datatable/components/BootstrapDatatable.js";



class ReactDatatable extends React.Component {
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
          <div>
            this is datatable test
          </div>
        )
    }
}

export default ReactDatatable;
