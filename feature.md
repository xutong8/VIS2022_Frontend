3.15
两种 action 的类型：

1. action 为 tlist 中的一种
   1.1 para：key 已经确定，需要输入 1-2 个数字；todo: 展示 1 or 2 的逻辑还未添加；✅

2. select、sum、mul、astype、rank
   2.1 para
   2.1.1 i_type：==、like、all、num，单选框；✅
   2.1.2 i：✅
   2.1.2.1 如果 i_type 为==，则从 headers 里头选，拼成 list，复选框 ✅
   2.1.2.2 如果 i_type 为 like，则从[int, float]选，复选框 ✅
   2.1.2.3 其余就不考虑 ✅
   2.1.3 o_type：从[new_table, append, replace]，单选框；✅
   2.1.4 args：任意输入一个字符串，可以输入一个或多个字符串；✅
   2.1.5 kwargs：输入 k-v，任意多对；✅

返回的结果为：
pid：节点的 id；
t：对应上面的 action；
para：

3.21

1. 添加 edit groups 按钮，换文本 Cancel Edit，Data Table 的第一列复选框和 Attribute Groups 默认不开启，点击 edit 才开启；✅
2. config 按钮；✅
3. highlight 高亮节点和边，优化效果；ChartContainer 里的图表 dbclick 后也要高亮；
4. Attribute Groups 做成折叠面板，折叠面板的 title 为 Group + ${index}，同时上下分页取消；Attribute Groups 和 Data Table 均要滚动条；
5. Chart Container 窄一点；
6. FlowChart 拆分为两个 Card，下面的 Card title 为 Transformation Paths；
  6.1 FlowChart 展示为缩略图，根节点展示 Source Table，
  D 节点展示为
  <template>
    <div>Table + ${index}</div>
    <div>
      new attributes: 
      // 1. 包含output_mode，且output_mode为append，展示当前当前节点的headers.length - 父节点的headers.length；
      // 2. 其他情况直接展示当前headers.length； 
    </div>
  </template>
  V节点原样展示；
  6.2 Transformation Paths按照原来的逻辑展示；
7. FlowChart 的 header 部分在 ➕ 号按钮左侧添加一个文本叫 new visualization；
