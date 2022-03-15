两种action的类型：

1. action为tlist中的一种
  1.1 para：key已经确定，需要输入1-2个数字；todo: 展示1 or 2的逻辑还未添加；✅

2. select、sum、mul、astype、rank
  2.1 para
    2.1.1 i_type：==、like、all、num，单选框；✅
    2.1.2 i：✅
      2.1.2.1 如果i_type为==，则从headers里头选，拼成list，复选框
      2.1.2.2 如果i_type为like，则从[int, float]选，复选框
      2.1.2.3 其余就不考虑
    2.1.3 o_type：从[new_table, append, replace]，单选框；✅
    2.1.4 args：任意输入一个字符串，可以输入一个或多个字符串；✅
    2.1.5 kwargs：输入k-v，任意多对；✅

返回的结果为：
pid：节点的id；
t：对应上面的action；
para：