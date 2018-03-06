import React from "react";
import _ from "lodash";
// import(`./../media/css/dataTables.foundation.min.css`);


class FoundationDatatable extends React.Component {
    constructor (props){
        super(props);
    }

    componentDidMount() {
      let element = this.getElement(this.props.id, this.props.className),
          props = jQuery.extend(true, {}, this.props);
      this.datatable(element, props);
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
        return $($(class_selector).get(0));
      } else {
        return $($("table").get(0));
      }
    }

    componentWillUpdate(nextProps) {
        let oldProps = jQuery.extend(true, {}, this.props),
            newProps = jQuery.extend(true, {}, nextProps),
            oldPropsData = oldProps.dtData,
            nextPropsData = newProps.dtData,
            oldPropsOptions = oldProps.options,
            nextPropsOptions = newProps.options,
            hasCheckOptionsChange = newProps.hasCheckOptionsChange || false;
        if (!_.isEqual(oldPropsData, nextPropsData) || (hasCheckOptionsChange && !_.isEqual(oldPropsOptions, nextPropsOptions)) ) {
            // id 不一致 该如何
            let element = this.getElement(oldProps.id, oldProps.className);
            this.datatable(element, newProps);
        }
    }

    datatable(element, props) {
        let events = props.events,
            options = this.getOptionByProps(props),
            datatable_events = events || [],
            events_num = datatable_events.length,
            i = 0;
        Promise.all([
           import(`./../media/js/dataTables.foundation.min.js`),
           import(`./../media/css/dataTables.foundation.min.css`)
         ]).then(() => {
        // import(`./../media/js/dataTables.foundation.min.js`).then(() => {
          if ($.fn.DataTable.isDataTable(element)) {
              let dt = element.DataTable();
              dt.destroy();
              // empty in case the columns change https://datatables.net/reference/api/destroy()
              element.empty();
          }
          // https://datatables.net/upgrade/1.10
          element.DataTable(options);
          // bind event
          for (; i < events_num; i++) {
            let _event = datatable_events[i],
                type = _event.type,
                scope = _event.scope,
                func = _event.func;
            element.on(type, scope, func);
          }
        });


    }

    getOptionByProps(props) {
        let dtData = props.dtData,
            props_options = props.options,
            hasOptimizeDisplay = props.hasOptimizeDisplay || false,
            options = {};
        if ( !!!dtData || !dtData.hasOwnProperty("_method") ) {
          options.columns = props.columns;
          options.data = [];
          options.language = {};
          options.language.emptyTable = props_options.language.loadingRecords || 'Loading...';
          options.paging = false;
          options.searching = false;
          options.lengthChange = false;
          options.info = false;
          return options;
        }
        options = _.extend(props_options, {
          columns: props.columns
        });
        if ( dtData._method === 'ajax') {
          if (hasOptimizeDisplay) {
            if (!!!options.serverSide) {
              options.deferRender = true;
            } else {
              options.processing = true;
            }
          }
          options.ajax = dtData;
        } else if ( dtData._method === 'data') {
          options.data = dtData.data;
          // isLoading 添加loading效果
          if (dtData._isLoading) {
            options.language.emptyTable = options.language.loadingRecords || 'Loading...';
          }
          if (hasOptimizeDisplay && options.data && options.data.length <= 10) {
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

export default FoundationDatatable;
