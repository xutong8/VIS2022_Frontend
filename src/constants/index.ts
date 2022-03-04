const NODE_NAME_CARD = "card";

enum NodeType {
  D = "D",
  V = "V",
}

enum ChartType {
  SCATTER = "scatter",
  LINE = "line",
  CAT_LINE = "cat_line",
  BAR = "bar",
}

const initial_list = [
  "headers",
  "T",
  "input",
  "output mode",
  "new columns",
  "args",
  "parameters",
];

export { NODE_NAME_CARD, NodeType, ChartType, initial_list };
