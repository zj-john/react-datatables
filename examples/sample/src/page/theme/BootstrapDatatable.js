//index.js
import React from 'react';
import Datatable from 'react-datatable-jq'
import { options } from './../config.js'

require("./../../assets/bootstrap/js/bootstrap.min.js");
require("./../../assets/bootstrap/css/bootstrap.min.css");

class BootstrapDatatable extends React.Component {
	constructor (props) {
	    super(props);
	    // 修改默认option
	    options.ording = false;
	    this.options = options;
        this.options_new = {
          dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'l>r>" + "t" + "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
          autoWidth: false,
          searching: true,
          paging: true,
          ording: true,
          language: {
            "search": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "info": "<b>从_START_到_END_ / 共_TOTAL_条记录</b>",
            "infoEmpty": "显示0条记录",
            "emptyTable": "没有符合条件的记录",
            "zeroRecords": "没有符合条件的记录",
            "loadingRecords": "加载中...",
            "processing": "处理中...",
            "paginate": {
                "first": "<b>首页</b>",
                "previous": "<b>上一页</b>",
                "next": "<b>下一页</b>",
                "last": "<b>尾页</b>"
            }
          }
        };
	    this.events = [
	      {
	        type: "click",
	        scope: "tbody tr td",
	        func: function() {
	           console.log("you click the td dom");
	        }
	      }
	    ]

        this.events_new = [
          {
            type: "click",
            scope: "tbody tr td",
            func: function() {
               console.log("you click the td dom new");
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
							render: function(data, full) {
                return data.toUpperCase() === 'M' ? "Boy": "Girl";
	            },
	            orderable: false
	        },
	        {
	            data: null,
	            title: 'Menu',
	            render: function() {
                return `<button className={action}>Action</button>`
              },
	            className:"menu",
	            orderable: false,
	            createdCell: function (td, cellData, rowData, row, col) {
	                $(td).on('click', '.action', function () {
	                    page.setState({
	                        showModal: true,
	                        modalInfo: rowData,
	                    })
	                });
	            }
	        }
	    ]
        this.columns_new = [
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
                render: function(data, full) {
                return data.toUpperCase() === 'M' ? "Boy": "Girl";
                },
                orderable: false
            },
            {
                data: null,
                title: 'Menu',
                render: function() {
                return `<button className={action}>Action</button>`
              },
                className:"menu",
                orderable: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).on('click', '.action', function () {
                        page.setState({
                            showModal: true,
                            modalInfo: rowData,
                        })
                    });
                }
            },
            {
                data: null,
                title: 'Menu',
                render: function() {
                return `<button className={action}>Action1</button>`
              },
                className:"menu",
                orderable: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).on('click', '.action', function () {
                        page.setState({
                            showModal: true,
                            modalInfo: rowData,
                        })
                    });
                }
            },
            {
                data: null,
                title: 'Menu',
                render: function() {
                return `<button className={action}>Action2</button>`
              },
                className:"menu",
                orderable: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).on('click', '.action', function () {
                        page.setState({
                            showModal: true,
                            modalInfo: rowData,
                        })
                    });
                }
            }
        ]
	    this.state = {
	        dtData: null,
	    }
        this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount () {
			const url = "/api/basic/ajax";
      const method_url = "/api/method_url";
      let form_data = {
				"range": "all"
      }
      let dtData = {
        _method: "url",
        url: method_url
      }
      let dtData_new = {
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
          dtData: dtData
      })
    }

    handleClick() {
        console.log(1);
        const url = "/api/basic/ajax";
        let dtData_new = {
            _method: "data",
            data: []
          };
        this.setState({
            dtData:dtData_new
        })
    }
// theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable

	render() {
	    return (
  				<div>this is sample
                <button onClick={this.handleClick}>change</button>
					<Datatable
                        theme = {"bootstrap"}
						options = { this.options }
						dtData = {this.state.dtData}
						columns={this.columns}
						events = {this.events}
						className="table table-striped table-hover"
						id="1_table"
					>
					</Datatable>
					</div>
	    );
	}
}
export default BootstrapDatatable;
