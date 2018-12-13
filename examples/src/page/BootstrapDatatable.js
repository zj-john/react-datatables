import React from 'react';
import { default as Datatable } from 'react-datatable-jq'
import 'react-datatable-jq/lib/media/js/dataTables.bootstrap4.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.bootstrap4.min.css'
import { options } from './config.js'
window.jQuery = window.$ = require('jquery');
require("../assets/bootstrap/js/bootstrap.min.js");
require("../assets/bootstrap/css/bootstrap.min.css");

class BootstrapDatatable extends React.Component {
    constructor(props) {
        super(props);
        // 修改默认option
        options.ording = false;

        // deep copy
        this.options = JSON.parse(JSON.stringify(options));
        this.options.processing = true;
        this.options_new = JSON.parse(JSON.stringify(options));
        this.events = [
            {
                type: "click",
                scope: "tbody tr td",
                data: { id: 1 },
                func: function (e) {
                    console.log("you click the td dom && give the data:", e.data.id);
                }
            }
        ]
        this.events_new = [
            {
                type: "click",
                scope: "tbody tr td",
                func: function () {
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
                render: function (data, full) {
                    return data.toUpperCase() === 'M' ? "Boy" : "Girl";
                },
                orderable: false
            },
            {
                data: null,
                title: 'Menu',
                render: function () {
                    return `<button className={action}>Action</button>`
                },
                className: "menu",
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
                render: function (data, full) {
                    return data.toUpperCase() === 'M' ? "Boy" : "Girl";
                },
                orderable: false
            },
            {
                data: null,
                title: 'Menu',
                render: function () {
                    return `<button className={action}>Action</button>`
                },
                className: "menu",
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
                render: function () {
                    return `<button className={action}>Action1</button>`
                },
                className: "menu",
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
                render: function () {
                    return `<button className={action}>Action2</button>`
                },
                className: "menu",
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
        let form_data = {
            "range": "all"
        }
        this.dtData_new = {
            _method: "ajax",
            url: "/api/basic/ajax",
            data: function (d) {
                $.extend(d, form_data);
                return JSON.stringify(d);
            },
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataSrc: "data"
        };
        this.state = {
            dtData: null,
            columns: this.columns,
            events: this.events
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const page = this;
        const dtData = {
            _method: "url",
            url: "/api/method_url"
        }
        setTimeout(function () {
            page.setState({
                dtData: dtData
            })
        }, 5000);

    }

    handleClick() {
        this.setState({
            dtData: this.dtData_new,
            columns: this.columns_new,
            events: this.events_new
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>change</button>
                <Datatable
                    options={this.options}
                    dtData={this.state.dtData}
                    columns={this.state.columns}
                    events={this.state.events}
                    className="table table-striped table-hover"
                    id="1_table"
                >
                </Datatable>
            </div>
        );
    }
}

export default BootstrapDatatable;
