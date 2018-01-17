# react-datatables
Datatable components built with React

## Install
```
npm install react-datatable-jq --save
```

## Usage
```js

import React from 'react';
// import react-datatable-jq
import Datatable from 'react-datatable-jq'

// datatable global options. You can import it from your config.js
const options = {
  dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'l>r>" + "t" + "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
  autoWidth: false,
  searching: false,
  paging: true,
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
}


class BasicDatatable extends React.Component {
	constructor (props) {
	    super(props);
	    // change the default options or add new option
	    options.ording = false;
	    this.options = options;

      // the events list on datatable
	    this.events = [
	      {
	        type: "click",
	        scope: "tbody tr td",
	        func: function() {
	           console.log("a test");
	        }
	      }
	    ];
      // the columns for the datatable
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
                return data.toUpperCase() === 'M'?"Boy":"Girl";
	            },
	            orderable: false
	        },
	        {
	            data: null,
	            title: 'Menu',
	            className:"menu",
	            orderable: false,
	            createdCell: function (td, cellData, rowData, row, col) {
	                $(td).on('click', '.action', function () {
	                    console.log("you click the action dom");
	                });
	            }
	        }
	    ]
      // dtData is about the data
      this.state = {
	        DTdata: null,
	    }
	}

	componentWillMount () {
      let url = "/api/basic/ajax",
          postData = {
            "range": "all"
          },
          dtData = {
            _method: "ajax",
            url: url,
            data: function (d) {
                $.extend(d, postData);
                return JSON.stringify(d);
            },
            type: "post",
            contentType: "application/json; charset=utf-8",
            dataSrc: "data"
          };
      this.setState({
          dtData: dtData,
      })
  }


	render() {
      // theme: one of ["bootstrap", "bootstrap4", "foundation", "jqueryui", "material", "semanticui", "uikit"], default JqueryDatatable
	    return (
  				<div>this is sample
					<Datatable
                      theme = {""}
                      options = { this.options }
                      dtData = {this.state.dtData}
                      columns={this.columns}
                      events = {this.events}
                      className="table table-striped table-hover"
                      id="sample_table"
					>
					</Datatable>
				</div>
	    );
	}
}
```

## dtData
dtData have 4 kinds of usage
### ajax
```js
dtData = {
  // 标识 method 为ajax
  _method: "ajax",
  // 请求的url
  url: url,
  // 对request data的处理
  data: function (d) {
      $.extend(d, postData);
      return JSON.stringify(d);
  },
  // 请求的方法
  type: "post",
  // contentType
  contentType: "application/json; charset=utf-8",
  // 对response data的处理
  dataSrc: "data"
};
```
更多的用法可以参考[JQuery ajax](http://api.jquery.com/jQuery.ajax/).

### data
```js
dtData = {
  // 标识 method 为 data
  _method: "data",
  // 数据
  data: [
    {
      "id": 0,
      "name": "john",
      "sex": "M"
    }
  ]
};
```


### url
```js
dtData = {
  // 标识 method 为 url
  _method: "url",
  // 数据
  url: "/api/data.json"
};
```

### func
```js
dtData = {
  // 标识 method 为 url
  _method: "function",
  // 数据
  func: function (data, callback, settings) {
    callback(
      JSON.parse( localStorage.getItem('dataTablesData') )
    );
  }
};
```
