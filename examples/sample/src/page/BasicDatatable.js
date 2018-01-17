//index.js
import React from 'react';
import Datatable from 'react-datatable-jq'
import { options } from './config.js'
//
let operation_render = function (data, type, full, row, meta) {
    return `
   <span class="relationInfo tool_tip glyphicon glyphicon-th-large btn btn-xs" data-toggle="tooltip" title="详情页"></span>
   <span class="deviceAction tool_tip glyphicon glyphicon-resize-horizontal btn btn-xs" data-toggle="tooltip" title="拉入\出操作"></span>
   <span class="containerAction tool_tip glyphicon glyphicon-cog btn btn-xs" data-toggle="tooltip" title="容器操作"></span>
   <span class="checkAction tool_tip glyphicon glyphicon-ok btn btn-xs" data-toggle="tooltip" title="Check"></span>
    `
}

class BasicDatatable extends React.Component {
	constructor (props) {
	    super(props);
	    // 修改默认option
	    options.ording = false;
	    this.options = options;
	    this.events = [
	      {
	        type: "click",
	        scope: "tbody tr td",
	        func: function() {
	           console.log("a test");
	        }
	      }
	    ]

	    this.columns = [
	        {
	            data: 'id',
							title: 'ID',
	        },
	        {
	            data: 'name',
	            title: 'Name',
	            orderable: false
	        },
	        {
	            data: 'sex',
	            title: 'Sex',
							render: function (data, full) {
	                return `${data}G`;
	            },
	            orderable: false
	        },
	        {
	            data: null,
	            title: 'Menu',
	            render: operation_render,
	            className:"menu",
	            orderable: false,
	            createdCell: function (td, cellData, rowData, row, col) {
	                $(td).on('click', '.relationInfo', function () {
	                    window.location.href =  `#/relation?type=application&id=${rowData.app_id}&name=${rowData.app_name}`
	                });
	                $(td).on('click', '.deviceAction', function () {
	                    page.setState({
	                        showModal: true,
	                        modalInfo: rowData,
	                    })
	                });
	            }
	        }
	    ]
	    this.state = {
	        DTdata: null,
	    }
	}

	componentWillMount () {
			const url = "/api/basic/ajax";
      let form_data = {
				"range": "all"
      }
      let set_ajax = {
        _method: "ajax",
        url: url,
        data: function (d) {
            $.extend(d, form_data);
            return JSON.stringify(d);
        },
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataSrc: "data"
      }

      this.setState({
          DTdata: set_ajax,
      })
  }
// theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable

	render() {
	    return (
  				<div>this is sample
					<Datatable
              theme = {""}
							options = { this.options }
							DTdata = {this.state.DTdata}
							columns={this.columns}
							events = {this.events}
							className="table table-striped table-hover"
							id="application_table"
						>
						</Datatable>
					</div>
	    );
	}
}
export default BasicDatatable;
