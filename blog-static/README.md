博客静态页面说明：
class="container"用于水平居中，类用于固定宽度并支持响应式布局的容器, class="container-fluid"不是水平居中，类似100%宽度，占据全部视口。
在bootstrap中，.row标签代表行，要放入.container标签的盒子中，.col-md-number标签代表列，放入.row标签内，而react组件使用栅格系统用法是<Row></Row>和<Col></Col>
谁hover就在谁的css下面过渡。
文本过长溢出css处理方法：text-overflow:ellipsis;overflow:hidden;white-space:nowrap;被设置元素必需是块状元素。
可通过设置.hidden-xs或者.hidden-sm实现屏幕缩小隐藏。