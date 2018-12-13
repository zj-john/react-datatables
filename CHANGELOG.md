<a name="1.0.0"></a>
# 1.0.0 (2018-01-30)
1. 解决serverbyside时，table渲染2次的Bug


<a name="1.0.2"></a>
## 1.0.2 (2018-02-06)
1. Options深拷贝
2. 添加empty()方法，用于colums修改的情况


<a name="1.0.3-beta1"></a>
## 1.0.3-beta1 (2018-02-06)
1. 使用hack方法解决_method为data时，重复渲染的问题

<a name="1.0.3-beta2"></a>
## 1.0.3-beta2 (2018-02-07)
1. 改变theme插件引入方式
2. dtData不合法时的优化处理
3. 改变deep copy的方式

<a name="1.0.4"></a>
## 1.0.4 (2018-02-27)
1. 所有组件统一更新为1.0.3-beta2版
2. dtData中_method为data时，添加_isLoading属性，标识是否是加载中

<a name="1.0.5"></a>
## 1.0.5 (2018-03-01)
1. 修复上一版本中的resolve bug

<a name="1.0.6"></a>
## 1.0.6 (2018-03-06)
1. 修复Datatable样式污染的问题

<a name="1.0.7"></a>
## 1.0.7 (2018-12-04)
1. 修复Datatable不同theme对应datatable版本不一致的问题

<a name="1.0.8"></a>
## 1.0.8 (2018-12-06)
1. 去除require，更换为import
2. 添加datatables.net-dt

<a name="1.0.9"></a>
## 1.0.9 (2018-12-06)
1. 1.0.8 build版本

<a name="2.0.0"></a>
## 2.0.0 (2018-12-13)
1. 重构ReactDatatable组件
2. 不再区分theme，把theme样式、js放在客户端选择和渲染
3. 去除 theme,hasCheckOptionsChange 这2个prop
