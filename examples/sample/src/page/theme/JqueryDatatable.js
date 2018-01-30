//index.js
import React from 'react';
import Datatable from 'react-datatable-jq'
import { options } from './../config.js'

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
	           console.log("you click the td dom");
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
            dtData_new: null
	    }
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
          dtData: dtData,
          dtData_new: dtData_new
      })
  }
// theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable

	render() {
	    return (
  				<div>this is sample
					<Datatable
                        theme = {""}
						options = { this.options }
						dtData = {this.state.dtData}
						columns={this.columns}
						events = {this.events}
						className="table table-striped table-hover"
						id="2_table"
					>
					</Datatable>
                    <h2> other </h2>
                    <Datatable
                        theme = {""}
                        options = { this.options }
                        dtData = {this.state.dtData_new}
                        columns={this.columns_new}
                        events = {this.events}
                        className="table table-striped table-hover"
                        id="3_table"
                    >
                    </Datatable>
				</div>
	    );
	}
}
export default BasicDatatable;
