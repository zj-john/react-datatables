import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'datatables.net';

class ReactDatatable extends Component {
  constructor(props) {
    super(props);
    this.el = null;
    this.dt = null;
  }

  componentDidMount() {
    this.initDatatable();
  }

  shouldComponentUpdate(nextProps) {
    // options, dtData, columns, events, hasOptimizeDisplay
    const { dtData: oData, options: oOptions, columns: oColumns, events: oEvents } = this.props;
    const { dtData: nData, options: nOptions, columns: nColumns, events: nEvents } = nextProps;
    if (!Object.is(oData, nData) || !Object.is(oOptions, nOptions) || !Object.is(oColumns, nColumns) || !Object.is(oEvents, nEvents)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.destroyDatatable();
    this.initDatatable();
  }

  componentWillUnmount() {
    this.destroyDatatable();
  }
  attachEventHandlers() {
    const events = this.props.events || [];
    events.forEach(event => {
      if (typeof event.func !== 'undefined') {
        this.el.on(event.type, event.scope, event.data, event.func);
      }
    });
  }
  detachEventHandlers() {
    const events = this.props.events || [];
    events.forEach(event => {
      if (typeof event.func !== 'undefined') {
        this.el.off(event.type, event.scope);
      }
    });
  }
  initDatatable() {
    this.el = $(ReactDOM.findDOMNode(this));
    // https://datatables.net/upgrade/1.10
    // this.dt = window.$.fn.DataTable.call(this.el,this.prepareOptions());
    this.dt = this.el.DataTable(this.prepareOptions());
    this.attachEventHandlers();
  }
  destroyDatatable() {
    this.dt.destroy();
    // this.el.DataTable.destroy();
    this.detachEventHandlers();
    // empty in case the columns change https://datatables.net/reference/api/destroy()
    this.el.empty();
    this.el = null;
    this.dt = null;
  }

  prepareOptions() {
    let props = {...this.props},
      dtData = props.dtData,
      props_options = props.options,
      hasOptimizeDisplay = props.hasOptimizeDisplay || false,
      options = {};
    if (!!!dtData || !dtData.hasOwnProperty("_method")) {
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
    Object.assign(options, props_options, {
      columns: props.columns
    })
    if (dtData._method === 'ajax') {
      if (hasOptimizeDisplay) {
        if (!!!options.serverSide) {
          options.deferRender = true;
        } else {
          options.processing = true;
        }
      }
      options.ajax = dtData;
    } else if (dtData._method === 'data') {
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
    } else if (dtData._method === 'url') {
      options.ajax = dtData.url;
    } else if (dtData._method === 'function') {
      options.ajax = dtData.func;
    }
    return options;
  }

  render() {
    const { options, dtData, columns, events, hasOptimizeDisplay, ...props } = this.props;
    return (
      <table {...props}>
      </table>
    )
  }
}

ReactDatatable.propTypes = {
  options: PropTypes.object,
  dtData: PropTypes.object,
  columns: PropTypes.array,
  events: PropTypes.array,
  hasOptimizeDisplay: PropTypes.bool
};

export default ReactDatatable;