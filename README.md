# react-datatables-jq
Datatable components built with React.   
The document is use for react-datatable-jq^2.0.0.

> 对使用低版本的用户来说，基本上做到了向下兼容，在代码中无需更改使用方式，详见文档下方的更新说明。

## 安装
```
npm install react-datatable-jq --save
```

## 用法
```js

import Datatable from 'react-datatable-jq'
import 'react-datatable-jq/lib/media/js/dataTables.bootstrap.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.bootstrap.min.css'
// datatable global options. You can import it from your config.js
const options = {
    dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'l>r>" + "t" + "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
    autoWidth: false,
    searching: false,
    paging: true,
    language: {
        search: "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
        lengthMenu: "每页显示 _MENU_ 条记录",
        info: "<b>从_START_到_END_ / 共_TOTAL_条记录</b>",
        infoEmpty: "显示0条记录",
        emptyTable: "没有符合条件的记录",
        zeroRecords: "没有符合条件的记录",
        loadingRecords: "加载中...",
        processing: "处理中...",
        paginate: {
            "first": "<b>首页</b>",
            "previous": "<b>上一页</b>",
            "next": "<b>下一页</b>",
            "last": "<b>尾页</b>"
        }
    }
}

class BasicDatatable extends React.Component {
    constructor(props) {
        super(props);
        // change the default options or add new option
        options.ording = false;
        this.options = options;

        // the events bind on datatable
        this.events = [{
            type: "click",
            scope: "tbody tr td",
            data: {id:1}
            func: function(e) {
                console.log("this is a test, you can console the id", e.data.id);
            }
        }];
        // the columns for the datatable
        this.columns = [{
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
            className: "menu",
            orderable: false,
            createdCell: function(td, cellData, rowData, row, col) {
                $(td).on('click', '.action', function() {
                    console.log("you click the action dom");
                });
            }
        }]
        // dtData 负责 datatable data的部分
        this.state = {
            DTdata: null,
        }
    }

    componentDidMount() {
        let url = "/api/basic/ajax",
            postData = {
                "range": "all"
            },
            dtData = {
                _method: "ajax",
                url: url,
                data: function(d) {
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
        return (
          <div>
              this is sample：
              <Datatable
                  options = {this.options}
                  dtData = {this.state.dtData}
                  columns = {this.columns}
                  events = {this.events}
                  className = "table table-striped table-hover"
                  id = "sample_table"
              />
          </div >
      );
    }
}
```

# Props

## options（必填）
options中支持除ajax和data之外的datatable options中的取值，具体可选取值请参考以下地址
[datatable options](https://www.datatables.net/manual/options)

> 因为考虑到datatable中数据的变化，所以把和数据相关的ajax和data属性合为dtData这个props，这样在react组件中使用和判断变化时会比较方便。

## dtData
dtData代表了datatable中取值的方式，有以下4种：
### ajax
通过ajax的方式传输，可以定义各种参数和处理方法，配合option可以实现后端分页。
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
}
```
更多的用法可以参考[JQuery ajax](http://api.jquery.com/jQuery.ajax/).

### data（必填）
直接给datatable传输数据。
```js
dtData = {
  // 标识 method 为 data
  _method: "data",
  // 标识当前数据在加载中，支队data:[]有效
  _isLoading: true
  // 数据
  data: [
    {
      "id": 0,
      "name": "john",
      "sex": "M"
    }
  ]
}
```


### url
简易的ajax方式，只需要传输一个url，默认get方法传输。
```js
dtData = {
  // 标识 method 为 url
  _method: "url",
  // 数据
  url: "/api/data.json"
}
```

### func
更自由的处理方式，参考[Datatable ajax](https://datatables.net/reference/option/ajax)
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
}
```

### 其它
如果dtData为null，或不存在，将按照以下逻辑处理，形成一种loading的效果。
```js
options.columns = props.columns;
options.data = [];
options.language = {};
options.language.emptyTable = props_options.language.loadingRecords || 'Loading...';
options.paging = false;
options.searching = false;
options.lengthChange = false;
options.info = false;
```

> 建议dtData初始设置为null，后续用setState改变dtData，可以连贯成一种加载的效果。


## columns（必填）
提供Datatable的列信息，使用参考[Datatable columns](https://datatables.net/reference/option/columns)

## events
绑定在Datatable中的事件，使用方法如下：
```js
[
  {
    // 事件类型
    "type": "click",  
    // 事件触发的元素
    "scope": "tbody tr td",
    // 传输数据:类型不限，在func中通过event.data获取
    "data": {id:1}
    // 处理函数
    "func": function(){}
  }
]
```

## className
提供组件DOM的Class。

## id
提供组件DOM的ID。

## hasOptimizeDisplay
取值为布尔型，为true则在渲染组件时进行一些效果优化，比如dtData类型为data时，判断data的长度，小于10则不显示页码按钮等。  
默认取值false

# 更新说明
在2.0.0版本中，除了重构优化了代码，用法上去除了theme这个props。 相关的主题样式可以通过以下方式引入：

```js
import 'react-datatable-jq/lib/media/js/dataTables.bootstrap.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.bootstrap.min.css'
```

默认是不带任何datatable样式的。

支持的主题样式如下：
* datatable基本样式
```js
import 'react-datatable-jq/lib/media/css/jquery.dataTables.min.css'
```

* bootstrap
```js
import 'react-datatable-jq/lib/media/js/dataTables.bootstrap.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.bootstrap.min.css'
```

* bootstrap4
```js
import 'react-datatable-jq/lib/media/js/dataTables.bootstrap4.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.bootstrap4.min.css'
```

* foundation
```js
import 'react-datatable-jq/lib/media/js/dataTables.foundation.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.foundation.min.css'
```

* jqueryui
```js
import 'react-datatable-jq/lib/media/js/dataTables.jqueryui.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.jqueryui.min.css'
```

* material
```js
import 'react-datatable-jq/lib/media/js/dataTables.material.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.material.min.css'
```

* semanticui
```js
import 'react-datatable-jq/lib/media/js/dataTables.semanticui.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.semanticui.min.css'
```

* uikit
```js
import 'react-datatable-jq/lib/media/js/dataTables.uikit.min.js'
import 'react-datatable-jq/lib/media/css/dataTables.uikit.min.css'
```


> 除了加载以上样式外，请记得把框架本身的js和css导入。例如选择bootstrap样式时，需要同时引用bootstrap.css，bootstrap.js文件来辅助样式（根据不同主题要求而定）