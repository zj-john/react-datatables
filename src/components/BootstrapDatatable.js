import React from "react";
import ReactDOM from 'react-dom';
import _ from "lodash";
window.jQuery = window.$ = require('jquery')
const dataTable = require("./../media/js/jquery.dataTables.min.js");
$.fn.DataTable = dataTable;

class BootstrapDatatable extends React.Component {
    constructor (props){
        super(props);
    }

    componentDidMount() {
        Promise.all([
          import(`./../media/js/dataTables.bootstrap.min.js`),
          import(`./../media/css/dataTables.bootstrap.min.css`)
        ]).then( () => {
          let element = this.getElement(this.props.id, this.props.className);
          this.datatable(element, this.props);
        });
    }

    getElement(id, className) {
      if (id && typeof id ==="string") {
        return $("#" + id);
      } else if (className && typeof className ==="string") {
        let class_list = className.split(" "),
            class_selector = "";
        class_list.map(function(item){
          class_selector = class_selector + "." + item;
        });
        return $($(class_selector)[0]);
      } else {
        return $($("table")[0]);
      }
    }

    componentWillUpdate(nextProps) {
        let oldPropsData = this.props.dtData,
            nextPropsData = nextProps.dtData,
            oldPropsOptions = this.props.options,
            nextPropsOptions = nextProps.options,
            hasCheckOptionsChange = nextProps.hasCheckOptionsChange || false;
        if (!_.isEqual(oldPropsData, nextPropsData) || (hasCheckOptionsChange && !_.isEqual(oldPropsOptions, nextPropsOptions)) ) {
            let element = this.getElement(this.props.id, this.props.className);
            if ($.fn.DataTable.isDataTable(element)) {
                element.dataTable().fnClearTable();
                element.dataTable().fnDestroy();
            }
            this.datatable(element, nextProps);
        }
    }

    setOption(options, element, events) {
        const _dataTable = element.DataTable(options);
        let datatable_events = events || [],
            events_num = datatable_events.length,
            i = 0;
        for (; i < events_num; i++) {
          let _event = datatable_events[i],
              type = _event.type,
              scope = _event.scope,
              func = _event.func;
          element.on(type, scope, func);
        }
    }

    datatable(element, props) {
        let events = props.events,
            options = this.getOptionByProps(props),
            datatable_events = events || [],
            events_num = datatable_events.length,
            i = 0,
            _dataTable = element.DataTable(options);

        // bind event
        for (; i < events_num; i++) {
          let _event = datatable_events[i],
              type = _event.type,
              scope = _event.scope,
              func = _event.func;
          element.on(type, scope, func);
        }
    }

    getOptionByProps() {
        let props = arguments[0],
            dtData = props.dtData,
            options = {};
        options = _.extend(props.options, {
          columns: props.columns,
          hasOptimizeDisplay: props.hasOptimizeDisplay
        });
        if ( dtData._method === 'ajax') {
          if (!!!options.serverSide) {
              options.deferRender = true;
          }
          options.ajax = dtData;
        } else if ( dtData._method === 'data') {
          options.data = dtData.data;
          if (options.hasOptimizeDisplay && options.data && options.data.length <= 10) {
              options.paging = false;
              options.searching = false;
              options.lengthChange = false;
          }
        } else if ( dtData._method === 'url') {
          options.ajax = dtData.url;
        } else if ( dtData._method === 'function') {
          options.ajax = dtData.func;
        }
        return options;
    }

    render() {
        // theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"]
        // options: datatable options, but ajax or data
        // dtData: option.ajax or option.data
        // columns: the columns setting of datatable
        // events: the callback function after draw complete
        // hasCheckOptionsChange: check the change of options when componentWillUpdate
        // hasOptimizeDisplay: the optimize for the display
        let {theme, options, dtData, columns, events,  hasCheckOptionsChange, hasOptimizeDisplay, ...props } = this.props;

        return (
            <table {...props} id={ this.props.id } className = {this.props.className}>
            </table>
        )
    }
}

export default BootstrapDatatable;
