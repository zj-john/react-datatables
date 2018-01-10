import React from "react";
import _ from "lodash";
window.$ = window.jQuery = require("./../media/js/jquery.js");
const dataTable = require("./../media/js/jquery.dataTables.js");
$.fn.DataTable = dataTable;

export default class ReactDatatable extends React.Component {
    constructor (props){
        super(props);
    }

    componentDidMount() {
        const theme = this.props.theme;
        if (theme) {
          Promise.all([
            import(`./../media/js/dataTables.${theme}.js`),
            import(`./../media/css/dataTables.${theme}.css`)
          ]).then( () => {
            let element = $(this.refs.table);
            this.datatable(element, this.props);
          })
        } else {
          import("./../media/css/jquery.dataTables.css").then( () => {
            let element = $(this.refs.table);
            this.datatable(element, this.props);
          })
        }

    }

    componentWillUpdate(nextProps) {
        let oldPropsData = this.props.dataSrc,
            nextPropsData = nextProps.dataSrc,
            oldPropsOptions = this.props.options,
            nextPropsOptions = nextProps.options,
            hasCheckOptionsChange = nextProps.hasCheckOptionsChange || false;
        if (!_.isEqual(oldPropsData, nextPropsData) || (hasCheckOptionsChange && !_.isEqual(oldPropsOptions, nextPropsOptions)) ) {
            let element = $(this.refs.table);
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
            options = this.getOptionByProps(props);
        this.setOption(options, element, events);
    }

    getOptionByProps() {
        let props = arguments[0],
            dataSrc = props.dataSrc,
            options = {};
        options = _.extend(props.options, {
          columns: props.columns,
          hasOptimizeDisplay: props.hasOptimizeDisplay
        });
        if ( dataSrc.method === 'ajax') {
          let {url, data, type} = dataSrc;
          if (options.serverSide) {
              options.ajax = {
                  url: url,
                  data: function (d) {
                      delete d.search;
                      let _order = d.order[0];
                      let column = d.columns[_order.column].data;
                      d.order = {
                          column: column,
                          dir: _order.dir
                      };
                      delete d.columns;
                      $.extend(d, data);
                      return JSON.stringify(d);
                  },
                  type: type,
                  contentType: "application/json; charset=utf-8",
                  dataSrc: function (json) {
                      json.recordsFiltered = json.recordsTotal;
                      return json.data;
                  }
              }
          } else {
              options.deferRender = true;
              options.ajax = {
                  url: url,
                  data: function (d) {
                      $.extend(d, data);
                      return JSON.stringify(d);
                  },
                  type: type,
                  contentType: "application/json; charset=utf-8",
                  dataSrc: "data"
              }
          }

        } else if ( dataSrc.method === 'data') {
          options.data = dataSrc.data;
          if (options.hasOptimizeDisplay && options.data && options.data.length <= 10) {
              options.paging = false;
              options.searching = false;
              options.lengthChange = false;
          }

        } else if ( dataSrc.method === 'url') {
          let url = dataSrc.url;
          options.ajax = {
              url: url,
              dataSrc: "data",
              complete: function (xhr) {
                  // AjaxActions.contentLoaded(xhr)
              }
          }
        }
        // console.log(options);
        return options;
    }

    render() {
        let {
          theme, // theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"]
          options, // datatable options, but ajax or data
          dataSrc, // option.ajax or option.data
          columns, // the columns setting of datatable
          events,  // the callback function after draw complete
          hasCheckOptionsChange, // check the change of options when componentWillUpdate
          hasOptimizeDisplay, // the optimize for the display
          ...props } = this.props;
        // console.log("props", this.props);
        return (
            <table {...props} ref="table" id={ this.props.id }>
            </table>
        )
    }
}
