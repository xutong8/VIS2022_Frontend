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

const vlist = ["scatter", "line", "bar"];
const tmap = {
  PCA: "pca",
  "t-SNE": "tsne",
  MDS: "mds",
  UMAP: "umap",
  "k-Means": "kmeans",
  DBSCAN: "dbscan",
  LDA: "lda",
};
const tlist = ["PCA", "t-SNE", "MDS", "UMAP", "k-Means", "DBSCAN", "LDA"];

const tdlist = [
  "CDM",
  "local goodness",
  "outlying",
  "convex",
  "skinny",
  "stringy",
  "straight",
  "monotonic",
  "skewed",
  "clumpy",
  "striated",
];

const tdmap = {
  CDM: "sca_cdm",
  "local goodness": "sca_localgoodness",
  outlying: "sca_outlying",
  convex: "sca_convex",
  skinny: "sca_skinny",
  stringy: "sca_stringy",
  straight: "sca_straight",
  monotonic: "sca_monotonic",
  skewed: "sca_skewed",
  clumpy: "sca_clumpy",
  striated: "sca_striated",
};

const fdlist = ["outstanding No.1", "correlation", "linearness"];

const fdmap = {
  "outstanding No.1": "lin_outstanding1",
  correlation: "lin_correlation",
  linearness: "lin_linearness",
};

const statlist = ["dispersion", "skew", "heavy tail"];

const statmap = {
  dispersion: "sta_dispersion",
  skew: "sta_skew",
  "heavy tail": "sta_heavytail",
};

const actions = [...tlist, "select", "sum", "mul", "astype", "rank"];
const default_action = actions[0];

const i_types = ['==', 'like', 'all', 'num'];
const default_i_type = i_types[0];

const o_types = ['float', 'int'];
const default_o_type = o_types[0];

export {
  NODE_NAME_CARD,
  NodeType,
  ChartType,
  initial_list,
  // vlist
  vlist,
  // tlist
  tlist,
  tmap,
  // 2-dimension
  tdlist,
  tdmap,
  // 1-dimension
  fdlist,
  fdmap,
  // statistics
  statlist,
  statmap,
  // actions
  actions,
  default_action,
  // i_types
  i_types,
  default_i_type,
  // o_types
  o_types,
  default_o_type
};
