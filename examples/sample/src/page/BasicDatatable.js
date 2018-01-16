//index.js
import React from 'react';
import { Datatable } from 'react-datatable-jq'
import { options } from './config.js'

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
	    options.serverSide = true;
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
	                $(td).find('.tool_tip').tooltip({
	                    placement: 'top',
	                });
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
	        datatableData: null,
	    }
	}

	componentWillMount () {
			const url = "http://yapi.demo.qunar.com/mock/2910/api/basic/ajax";
      let form_data = {
				"range": "all"
      }
      let set_ajax = {
        "method":"ajax",
        "url": url,
        "data": form_data,
        "type": 'post'
      }

      this.setState({
          datatableData: set_ajax,
      })
  }


	render() {
	    return (
  				<div>this is sample<Datatable /></div>
	    );
	}
}
export default BasicDatatable;
