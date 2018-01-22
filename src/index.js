import React from "react";
import JqueryDatatable from "./components/JqueryDatatable.js";
import BootstrapDatatable from "./components/BootstrapDatatable.js";
import Bootstrap4Datatable from "./components/Bootstrap4Datatable.js";
import FoundationDatatable from "./components/FoundationDatatable.js";
import JqueryuiDatatable from "./components/JqueryuiDatatable.js";
import MaterialDatatable from "./components/MaterialDatatable.js";
import SemanticuiDatatable from "./components/SemanticuiDatatable.js";
import UikitDatatable from "./components/UikitDatatable.js";

class ReactDatatable extends React.Component {
    getDatatable() {
        let theme = this.props.theme || "default";

        // theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable
        switch (theme.toLowerCase()) {
            case "bootstrap":
                return <BootstrapDatatable {...this.props}/>;
            case "bootstrap4":
                return <Bootstrap4Datatable {...this.props}/>;
            case "foundation":
                return <FoundationDatatable {...this.props}/>;
            case "jqueryui":
                return <JqueryuiDatatable {...this.props}/>;
            case "material":
                return <MaterialDatatable {...this.props}/>;
            case "semanticui":
                return <SemanticuiDatatable {...this.props}/>;
            case "uikit":
                return <UikitDatatable {...this.props}/>;
            default:
                return <JqueryDatatable {...this.props}/>;
        }
        ;
    }

    render() {
        return (
            <div>
                { this.getDatatable() }
            </div>
        )
    }
}

export default ReactDatatable;
