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
3. highlight 高亮节点和边，优化效果；ChartContainer 里的图表 dbclick 后也要高亮；✅
4. Attribute Groups 做成折叠面板，折叠面板的 title 为 Group + ${index}，同时上下分页取消；Attribute Groups 和 Data Table 均要滚动条；✅
5. Chart Container 窄一点；✅
7. FlowChart 的 header 部分在 ➕ 号按钮左侧添加一个文本叫 new visualization；✅
6. FlowChart 拆分为两个 Card，下面的 Card title 为 Transformation Paths；✅
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
  6.2 Transformation Paths按照原来的逻辑展示；✅

3.22

1. Tranformation Paths布局算法调整；✅
2. Simple Flow Chart调整布局方向；✅
3. Attribute Groups：
  3.1 长度最长的Group：title处展示Group ${index}  Dimension Matching(斜体)  Containing ${len} attributes
  3.2 其他的Group：title处展示Group ${index}  最长匹配的子串(对每个item split('')，逐个比较) Containing ${len} attributes；
4. Chart Container和FlowChart高亮样式保持一致；✅

3.24

1. Data Table和Attribute Group加title；✅
2. ScatterChart的symbolSize小一点；✅
3. ChartContainer中selected的阴影小一点；✅
4. cat_line变成scatter；✅
5. flowchart的handle组件需要调整连接方向；✅

3.27

1. ordinary节点添加border-radius；✅
2. ordinary节点的title只要第一个item；✅
3. 20 new；✅
4. 边颜色加深；✅
5. ordinary节点边框颜色加深；✅
6. 选中的节点蓝色阴影加深；✅
7. Transformation Paths；
8. 散点图的legend位置往上偏移；✅
9. Card的title字号编好，Paths和Groups把s都去掉，不用复数；✅
10. Configuration：✅
  10.1 distribution-wise
  10.2 point-wise
  10.3 compound
  10.4 all


3.29

1. Card的title字体调整为25px，调整周围部分的间距✅


缩略图
2. Source Table字体调整为120px，上下居中✅
3. 普通D节点的T换成100px✅
4. 高亮的边和节点border颜色换成#0098d6，高亮的边stroke-width为15px✅
5. 不高亮的边颜色换成rgb(190, 190, 220)✅
14. 贴图✅
15. 加号按钮砍掉、new transformation和new viualization蓝色假按钮✅


Transformation Path
6. 取消高亮效果✅ 
7. 节点增加padding✅
8. 节点表格的headers文字居中，字体大小为32px，文字替换为Attribute✅
9. 表格中item字体大小为30px✅
10. T换成38px，文字居中✅
11. 下面的样式要像一个表格，只有上下边框和中间的边框，key要居中，增加灰背景✅
12. headers的padding要小一点
13. 节点高度要固定，不要自适应，屏幕高度的一半