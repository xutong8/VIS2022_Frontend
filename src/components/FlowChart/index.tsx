import { ReactElement, useEffect, useState } from "react";
import styles from "./index.less";
import { ChartType, NodeType } from "@/constants";
import ReactFlow, {
  isEdge,
  isNode,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "react-flow-renderer";
import dagre from "dagre";
import Headers from "./Headers";
import Scatter from "./Scatter";
import Line from "./Line";
import Bar from "./Bar";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { ChartTypeContext } from "@/store/chartType";
import { httpRequest } from "@/services";
import Ordinary from "./Ordinary";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  headersNode: Headers,
  scatterNode: Scatter,
  lineNode: Line,
  barNode: Bar,
  ordinaryNode: Ordinary,
};

const nodeBoundingRect = {
  [NodeType.D]: {
    width: 550,
    height: 500,
  },
  [NodeType.V]: {
    width: 550,
    height: 450,
  },
} as {
  [key: string]: any;
};

const isStart = (el: any, edges: any[]) => {
  return !edges.find((edge) => edge.target === el.id);
};

const isEnd = (el: any, edges: any[]) => {
  return !edges.find((edge) => edge.source === el.id);
};

const case1Layout = (elements: any[], direction: string) => {
  const defaultPositions = [
    {
      id: "r",
      position: {
        x: 3663.5003959494557,
        y: -254,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (import)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
      position: {
        x: -693,
        y: 3027,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
      position: {
        x: 2294.5007377655147,
        y: 539,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
      position: {
        x: 315.00091935268034,
        y: 1200,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (import)'], dtype='object')}",
      position: {
        x: 4731.00092353145,
        y: 540,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (group0)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
      position: {
        x: 2085.000185176711,
        y: 3032,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}",
      position: {
        x: 3292.0009647871016,
        y: 547,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
      position: {
        x: 1584.5007427441365,
        y: 1206,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
      position: {
        x: 1590.5000883214911,
        y: 1633,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (group0)'], dtype='object')}",
      position: {
        x: 5395.000924363526,
        y: 546,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: -140,
        y: 3040,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 2260,
        y: 1640,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['continent'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
      position: {
        x: 413,
        y: 3040,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['continent'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
      position: {
        x: 6072.00061765734,
        y: 540,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 967,
        y: 3020,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 945.0005455603691,
        y: 1200,
      },
    },
    {
      id: "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['continent'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
      position: {
        x: 5963.000202521651,
        y: 3032,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
      position: {
        x: 4016.5001515055446,
        y: 539,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
      position: {
        x: 4368.000492285182,
        y: 1187,
      },
    },
    {
      id: "line<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 5411.000688878764,
        y: 3031,
      },
    },
    {
      id: "line<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 2633,
        y: 3040,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}",
      position: {
        x: 3622.0003525168995,
        y: 1200,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}",
      position: {
        x: 3637.500651907206,
        y: 1646,
      },
    },
    {
      id: "line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (import)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 4307,
        y: 3047,
      },
    },
    {
      id: "cat_line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (import)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 3749.0003300132194,
        y: 3038,
      },
    },
    {
      id: "cat_line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (import)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 7067,
        y: 3027,
      },
    },
    {
      id: "sum_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['continent'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 6513,
        y: 3040,
      },
    },
    {
      id: "sum_bar<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 4853,
        y: 3040,
      },
    },
    {
      id: "sum_bar<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 3180,
        y: 3047,
      },
    },
    {
      id: "count_bar<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles export', 'rank agriculture export', 'rank stone export', 'rank minerals export', 'rank metals export', 'rank chemicals export', 'rank vehicles export', 'rank machinery export', 'rank electronics export', 'rank other export', 'rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['textiles export', 'agriculture export', 'stone export', 'minerals export', 'metals export', 'chemicals export', 'vehicles export', 'machinery export', 'electronics export', 'other export', 'textiles import', 'agriculture import', 'stone import', 'minerals import', 'metals import', 'chemicals import', 'vehicles import', 'machinery import', 'electronics import', 'other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
      position: {
        x: 1527,
        y: 3027,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles export', 'rank agriculture export', 'rank stone export', 'rank minerals export', 'rank metals export', 'rank chemicals export', 'rank vehicles export', 'rank machinery export', 'rank electronics export', 'rank other export', 'rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
      position: {
        x: 2920,
        y: 1180,
      },
    },
    {
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank textiles export', 'rank agriculture export', 'rank stone export',\n       'rank minerals export', 'rank metals export', 'rank chemicals export',\n       'rank vehicles export', 'rank machinery export',\n       'rank electronics export', 'rank other export', 'rank textiles import',\n       'rank agriculture import', 'rank stone import', 'rank minerals import',\n       'rank metals import', 'rank chemicals import', 'rank vehicles import',\n       'rank machinery import', 'rank electronics import',\n       'rank other import'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank textiles export', 'rank agriculture export', 'rank stone export', 'rank minerals export', 'rank metals export', 'rank chemicals export', 'rank vehicles export', 'rank machinery export', 'rank electronics export', 'rank other export', 'rank textiles import', 'rank agriculture import', 'rank stone import', 'rank minerals import', 'rank metals import', 'rank chemicals import', 'rank vehicles import', 'rank machinery import', 'rank electronics import', 'rank other import'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'lda', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {'n_components': 4}}",
      position: {
        x: 2927.0000000000005,
        y: 1640,
      },
    },
  ];
  return elements.map((el: any) => {
    if (isNode(el)) {
      const isHorizontal = direction === "LR";
      /*@ts-ignore */
      el.targetPosition = isHorizontal ? "left" : "top";
      /*@ts-ignore */
      el.sourcePosition = isHorizontal ? "right" : "bottom";
      const position = defaultPositions.find((node: any) => node.id === el.id)
        ?.position ?? { x: 0, y: 0 };
      el.position = position;
    }

    return el;
  });
};

const case2Layout = (elements: any[], direction: string) => {
  const defaultPositions = [
    {
      position: {
        x: 2665.500907436547,
        y: -233,
      },
      id: "r",
    },
    {
      position: {
        x: 2760.0003030039916,
        y: 2580,
      },
      id: "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
    },
    {
      position: {
        x: 1486.000130572403,
        y: 387,
      },
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}",
    },
    {
      position: {
        x: 0.000056985688012014755,
        y: 1200,
      },
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
    },
    {
      position: {
        x: 0.00007369514355186047,
        y: 1800,
      },
      id: "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
    },
    {
      position: {
        x: 3140.0000743797336,
        y: 407,
      },
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
    },
    {
      position: {
        x: 5552.5003980055035,
        y: 2580,
      },
      id: "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 2297.5007062035093,
        y: 414.00000000000006,
      },
      id: "r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}",
    },
    {
      position: {
        x: -2.9995839976723033,
        y: 2585,
      },
      id: "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
    },
    {
      position: {
        x: 3997.500278506167,
        y: 440,
      },
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
    },
    {
      position: {
        x: 4607.000070875849,
        y: 1160,
      },
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
    },
    {
      position: {
        x: 574.0002531643202,
        y: 2591,
      },
      id: "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 1129.000875661598,
        y: 2584,
      },
      id: "line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 5392.000074844725,
        y: 1153,
      },
      id: "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}",
    },
    {
      position: {
        x: 1672.0002190250148,
        y: 2577,
      },
      id: "line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 3323.000105363558,
        y: 2585,
      },
      id: "line<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 2217.000222891802,
        y: 2577,
      },
      id: "cat_line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
    },
    {
      position: {
        x: 3884.500255992024,
        y: 2592,
      },
      id: "sum_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 4432.500767893574,
        y: 2592,
      },
      id: "sum_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
    {
      position: {
        x: 4995.500069604821,
        y: 2585,
      },
      id: "count_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
    },
  ];
  return elements.map((el: any) => {
    if (isNode(el)) {
      const isHorizontal = direction === "LR";
      /*@ts-ignore */
      el.targetPosition = isHorizontal ? "left" : "top";
      /*@ts-ignore */
      el.sourcePosition = isHorizontal ? "right" : "bottom";
      const position = defaultPositions.find((node: any) => node.id === el.id)
        ?.position ?? { x: 0, y: 0 };
      el.position = position;
    }

    return el;
  });
};

const case3Layout = (elements: any[], direction: string) => {
  const defaultPositions = [
    {
        "id": "r",
        "position": {
            "x": 8075.500879417722,
            "y": -187
        }
    },
    {
        "id": "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 8728.000318225177,
            "y": 2880
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}",
        "position": {
            "x": 6685.000114817416,
            "y": 600
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 6688.000841344405,
            "y": 1187
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p50', 'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53', 'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56', 'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59', 'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62', 'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65', 'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68', 'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71', 'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74', 'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77', 'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80', 'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83', 'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86', 'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89', 'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92', 'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95', 'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98', 'rank weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
        "position": {
            "x": 6688.00088028131,
            "y": 1747
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}",
        "position": {
            "x": 9668.500359735895,
            "y": 593
        }
    },
    {
        "id": "scatter<VIS>r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
        "position": {
            "x": 9287.000016759242,
            "y": 2880
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 10312.500915920222,
            "y": 1153
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'rank', 'i_type': 'like', 'i': ['float'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 0, 'method': 'first', 'numeric_only': True, 'na_option': 'keep', 'ascending': True, 'pct': False}, 'index': Index(['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2',\n       'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5',\n       'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8',\n       'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11',\n       'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14',\n       'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17',\n       'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20',\n       'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23',\n       'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26',\n       'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29',\n       'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32',\n       'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35',\n       'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38',\n       'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41',\n       'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44',\n       'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47',\n       'rank weight l2 p48', 'rank weight l2 p49', 'rank weight l2 p50',\n       'rank weight l2 p51', 'rank weight l2 p52', 'rank weight l2 p53',\n       'rank weight l2 p54', 'rank weight l2 p55', 'rank weight l2 p56',\n       'rank weight l2 p57', 'rank weight l2 p58', 'rank weight l2 p59',\n       'rank weight l2 p60', 'rank weight l2 p61', 'rank weight l2 p62',\n       'rank weight l2 p63', 'rank weight l2 p64', 'rank weight l2 p65',\n       'rank weight l2 p66', 'rank weight l2 p67', 'rank weight l2 p68',\n       'rank weight l2 p69', 'rank weight l2 p70', 'rank weight l2 p71',\n       'rank weight l2 p72', 'rank weight l2 p73', 'rank weight l2 p74',\n       'rank weight l2 p75', 'rank weight l2 p76', 'rank weight l2 p77',\n       'rank weight l2 p78', 'rank weight l2 p79', 'rank weight l2 p80',\n       'rank weight l2 p81', 'rank weight l2 p82', 'rank weight l2 p83',\n       'rank weight l2 p84', 'rank weight l2 p85', 'rank weight l2 p86',\n       'rank weight l2 p87', 'rank weight l2 p88', 'rank weight l2 p89',\n       'rank weight l2 p90', 'rank weight l2 p91', 'rank weight l2 p92',\n       'rank weight l2 p93', 'rank weight l2 p94', 'rank weight l2 p95',\n       'rank weight l2 p96', 'rank weight l2 p97', 'rank weight l2 p98',\n       'rank weight l2 p99'],\n      dtype='object')}<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['rank weight l2 p0', 'rank weight l2 p1', 'rank weight l2 p2', 'rank weight l2 p3', 'rank weight l2 p4', 'rank weight l2 p5', 'rank weight l2 p6', 'rank weight l2 p7', 'rank weight l2 p8', 'rank weight l2 p9', 'rank weight l2 p10', 'rank weight l2 p11', 'rank weight l2 p12', 'rank weight l2 p13', 'rank weight l2 p14', 'rank weight l2 p15', 'rank weight l2 p16', 'rank weight l2 p17', 'rank weight l2 p18', 'rank weight l2 p19', 'rank weight l2 p20', 'rank weight l2 p21', 'rank weight l2 p22', 'rank weight l2 p23', 'rank weight l2 p24', 'rank weight l2 p25', 'rank weight l2 p26', 'rank weight l2 p27', 'rank weight l2 p28', 'rank weight l2 p29', 'rank weight l2 p30', 'rank weight l2 p31', 'rank weight l2 p32', 'rank weight l2 p33', 'rank weight l2 p34', 'rank weight l2 p35', 'rank weight l2 p36', 'rank weight l2 p37', 'rank weight l2 p38', 'rank weight l2 p39', 'rank weight l2 p40', 'rank weight l2 p41', 'rank weight l2 p42', 'rank weight l2 p43', 'rank weight l2 p44', 'rank weight l2 p45', 'rank weight l2 p46', 'rank weight l2 p47', 'rank weight l2 p48', 'rank weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
        "position": {
            "x": 10323.500041759002,
            "y": 1760
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 5345.0003857002785,
            "y": 1200
        }
    },
    {
        "id": "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
        "position": {
            "x": 6493.5000385378125,
            "y": 2878
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 6055.000460609186,
            "y": 600
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
        "position": {
            "x": 6055.000452600725,
            "y": 1200
        }
    },
    {
        "id": "scatter<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 7050.000226220637,
            "y": 2872
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 7315.000823090505,
            "y": 600
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'pca', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': 2, 'type': 'num'}, 'para': {'n_components': 2}}",
        "position": {
            "x": 7315.000726097383,
            "y": 1200
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}",
        "position": {
            "x": 9025.000034663843,
            "y": 586
        }
    },
    {
        "id": "line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 10960.000862705998,
            "y": 2880
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}",
        "position": {
            "x": 5191.000652941331,
            "y": 600
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}",
        "position": {
            "x": 10970.500796892673,
            "y": 1167
        }
    },
    {
        "id": "r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}",
        "position": {
            "x": 10981.500823938526,
            "y": 1753
        }
    },
    {
        "id": "line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 7605.000300495185,
            "y": 2879
        }
    },
    {
        "id": "line<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 5380.0005542365225,
            "y": 2885
        }
    },
    {
        "id": "cat_line<VIS>r<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['sum: (weight l2)'], dtype='object')}<SEPERATION>{'name': 'null_num1', 'input': {'dim': 1, 'type': 'num'}, 'output': {'dim': 1, 'type': 'num'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}",
        "position": {
            "x": 8168.000692268941,
            "y": 2878
        }
    },
    {
        "id": "sum_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 9843.000809223686,
            "y": 2880
        }
    },
    {
        "id": "sum_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 5939.500961487358,
            "y": 2885
        }
    },
    {
        "id": "count_bar<VIS>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['configuration No'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'name': 'null_nom1', 'input': {'dim': 1, 'type': 'nominal'}, 'output': {'dim': 1, 'type': 'cat'}, 'para': {}}<SEPERATION><SEPERATION>r<SEPERATION>{'t': 'select', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49', 'weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'new_table', 'args': (), 'kwargs': {}, 'index': 'default'}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p0', 'weight l2 p1', 'weight l2 p2', 'weight l2 p3', 'weight l2 p4', 'weight l2 p5', 'weight l2 p6', 'weight l2 p7', 'weight l2 p8', 'weight l2 p9', 'weight l2 p10', 'weight l2 p11', 'weight l2 p12', 'weight l2 p13', 'weight l2 p14', 'weight l2 p15', 'weight l2 p16', 'weight l2 p17', 'weight l2 p18', 'weight l2 p19', 'weight l2 p20', 'weight l2 p21', 'weight l2 p22', 'weight l2 p23', 'weight l2 p24', 'weight l2 p25', 'weight l2 p26', 'weight l2 p27', 'weight l2 p28', 'weight l2 p29', 'weight l2 p30', 'weight l2 p31', 'weight l2 p32', 'weight l2 p33', 'weight l2 p34', 'weight l2 p35', 'weight l2 p36', 'weight l2 p37', 'weight l2 p38', 'weight l2 p39', 'weight l2 p40', 'weight l2 p41', 'weight l2 p42', 'weight l2 p43', 'weight l2 p44', 'weight l2 p45', 'weight l2 p46', 'weight l2 p47', 'weight l2 p48', 'weight l2 p49'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group0'], dtype='object')}<SEPERATION>{'t': 'sum', 'i_type': '==', 'i': ['weight l2 p50', 'weight l2 p51', 'weight l2 p52', 'weight l2 p53', 'weight l2 p54', 'weight l2 p55', 'weight l2 p56', 'weight l2 p57', 'weight l2 p58', 'weight l2 p59', 'weight l2 p60', 'weight l2 p61', 'weight l2 p62', 'weight l2 p63', 'weight l2 p64', 'weight l2 p65', 'weight l2 p66', 'weight l2 p67', 'weight l2 p68', 'weight l2 p69', 'weight l2 p70', 'weight l2 p71', 'weight l2 p72', 'weight l2 p73', 'weight l2 p74', 'weight l2 p75', 'weight l2 p76', 'weight l2 p77', 'weight l2 p78', 'weight l2 p79', 'weight l2 p80', 'weight l2 p81', 'weight l2 p82', 'weight l2 p83', 'weight l2 p84', 'weight l2 p85', 'weight l2 p86', 'weight l2 p87', 'weight l2 p88', 'weight l2 p89', 'weight l2 p90', 'weight l2 p91', 'weight l2 p92', 'weight l2 p93', 'weight l2 p94', 'weight l2 p95', 'weight l2 p96', 'weight l2 p97', 'weight l2 p98', 'weight l2 p99'], 'o_type': 'append', 'args': (), 'kwargs': {'axis': 1}, 'index': Index(['group1'], dtype='object')}<SEPERATION>{'name': 'null_num', 'input': {'dim': None, 'type': 'num'}, 'output': {'dim': None, 'type': 'num'}, 'para': {}}",
        "position": {
            "x": 10400.000189070934,
            "y": 2880
        }
    }
  ];
  return elements.map((el: any) => {
    if (isNode(el)) {
      const isHorizontal = direction === "LR";
      /*@ts-ignore */
      el.targetPosition = isHorizontal ? "left" : "top";
      /*@ts-ignore */
      el.sourcePosition = isHorizontal ? "right" : "bottom";
      const position = defaultPositions.find((node: any) => node.id === el.id)
        ?.position ?? { x: 0, y: 0 };
      el.position = position;
    }

    return el;
  });
};

const getLayoutedElements = (
  elements: any[],
  direction = "TB",
  customLayout = false,
  customCase: number
) => {
  if (customCase === 1) {
    return case1Layout(elements, direction);
  }

  if (customCase === 2) {
    return case2Layout(elements, direction);
  }

  if (customCase === 3) {
    return case3Layout(elements, direction);
  }

  if (customLayout) {
    if (elements.length === 0) return [];
    const edges = elements.filter((el) => isEdge(el));
    const startNode = elements.find((el) => isStart(el, edges));
    const endNode = elements.find((el) => isEnd(el, edges));
    const startPos = {
      x: -1800,
      y: 0,
    };
    const endPos = {
      x: 1800,
      y: 0,
    };
    const paths = [] as any[];
    const queue = [] as string[];
    queue.push(startNode.id);
    // 寻找邻接点
    const dfs = (node: any, edges: any[], path: any[]) => {
      if (node === endNode.id) {
        paths.push(path);
        return;
      }
      for (const edge of edges) {
        if (edge.source === node) {
          dfs(edge.target, edges, [...path, edge.target]);
        }
      }
    };
    for (const edge of edges) {
      if (edge.source === startNode.id) {
        const path = [startNode.id, edge.target] as any[];
        dfs(edge.target, edges, path);
      }
    }
    return elements.map((el) => {
      if (isNode(el)) {
        const isHorizontal = direction === "LR";
        /*@ts-ignore */
        el.targetPosition = isHorizontal ? "left" : "top";
        /*@ts-ignore */
        el.sourcePosition = isHorizontal ? "right" : "bottom";
        if (isStart(el, edges)) {
          el.position = startPos;
        } else if (isEnd(el, edges)) {
          el.position = endPos;
        } else {
          const rowIndex = paths.findIndex((path) => path.includes(el.id));
          const path = paths[rowIndex];
          const colIndex = path.indexOf(el.id);
          el.position = {
            x:
              (colIndex * (endPos.x - startPos.x)) / (path.length - 1) +
              startPos.x,
            y: rowIndex === 0 ? -300 : 300,
          };
        }
      }
      return el;
    });
  } else {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });
    elements.forEach((el) => {
      if (isNode(el)) {
        const node_type = el.data.node_type as string;
        const layout = nodeBoundingRect[node_type];
        dagreGraph.setNode(el.id, {
          width: layout.width,
          height: layout.height,
        });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        /*@ts-ignore */
        el.targetPosition = isHorizontal ? "left" : "top";
        /*@ts-ignore */
        el.sourcePosition = isHorizontal ? "right" : "bottom";
        const node_type = el.data.node_type as string;
        const layout = nodeBoundingRect[node_type];
        const nodeWidth = layout.width;
        const nodeHeight = layout.height;

        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
  }
};
export interface IFlowChartProps {
  graphData: any;
  setGraphData?: (graphData: any) => void;
  title: string | ReactElement;
  extra?: boolean;
  direction?: string;
  isSmooth?: boolean;
  preventZoom?: boolean;
  preventTranslate?: boolean;
  customLayout?: boolean;
  customCase: number;
  setCustomCase: (customCase: number) => void;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const {
    graphData,
    setGraphData = () => {},
    title,
    customCase,
    setCustomCase,
    extra = false,
    direction = "LR",
    isSmooth = false,
    preventZoom = false,
    preventTranslate = false,
    customLayout = false,
  } = props;

  const layoutGraph = () => {
    const nodes = (graphData?.nodes ?? []) as any[];
    const getNodeType = (node: any) => {
      const node_type = node?.data?.chart_type ?? ChartType.SCATTER;
      switch (node_type) {
        case ChartType.SCATTER:
          return "scatterNode";
        case ChartType.LINE:
          return "lineNode";
        case ChartType.BAR:
          return "barNode";
        case ChartType.CAT_LINE:
          return "lineNode";
        default:
          return "scatterNode";
      }
    };

    const newNodes = nodes.map((node, index: number) => ({
      id: node.id,
      position: [0, 0],
      data: {
        label: `node_${index}`,
        ...node,
        setGraphData,
      },
      nodesDraggable: true,
      className:
        node?.stress ?? false
          ? styles["stressed-node"]
          : styles["ordinary-node"],
      type:
        node.node_type === NodeType.D && !node.isSimple
          ? "headersNode"
          : node.node_type === NodeType.V
          ? getNodeType(node)
          : "ordinaryNode",
    }));
    const edges = (graphData?.edges ?? []) as any[];
    const newEdges = edges.map((edge, index: number) => ({
      id: `edge_${index}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      type: isSmooth ? "smoothstep" : undefined,
      className:
        edge?.stress ?? false
          ? styles["stressed-edge"]
          : styles["ordinary-edge"],
    }));
    setElements([...newNodes, ...newEdges]);
    setNodes(newNodes as any[]);
    setEdges(newEdges as any[]);
  };

  useEffect(() => {
    if (graphData?.nodes && graphData?.edges) {
      layoutGraph();
    }
  }, [graphData]);

  const [elements, setElements] = useState<any[]>([]);

  const [chartType, setChartType] = useState<any>("");
  const [popVisible, setPopVisible] = useState<boolean>(false);

  const popoverContent = (
    <div className={styles.popoverContent}>
      <Button
        type="primary"
        className={styles.btn}
        onClick={() => {
          setChartType("scatter");
          setPopVisible(false);
        }}
      >
        Scatter
      </Button>
      <Button
        type="primary"
        style={{ background: "red", borderColor: "red" }}
        className={styles.btn}
        onClick={() => {
          setChartType("bar");
          setPopVisible(false);
        }}
      >
        Bar
      </Button>
      <Button
        type="primary"
        style={{ background: "orange", borderColor: "orange" }}
        className={styles.btn}
        onClick={() => {
          setChartType("line");
          setPopVisible(false);
        }}
      >
        Line
      </Button>
    </div>
  );

  const handleConfirm = () => {
    if (chartType === "scatter") {
      if (!para.xy) return;
    }

    if (chartType === "line") {
      if (!para.y) return;
    }

    if (chartType === "bar") {
      if (!para.x || !para.y) return;
    }

    httpRequest
      .post("/addV", {
        vtype: chartType,
        channels: para,
      })
      .then((res: any) => {
        const graphData = res?.data?.result ?? {};
        const highlight = res?.data?.highlight ?? "";
        const nodes = graphData?.nodes ?? [];
        const newNodes = nodes.map((node: any) => ({
          ...node,
          stress: node.id === highlight,
        }));
        graphData.nodes = newNodes;
        setGraphData(graphData);
      })
      .finally(() => {
        // 确定之后需要清空状态
        setChartType("");
        setPara({});
      });
  };

  const [para, setPara] = useState<any>({});

  const disabled = () => {
    if (chartType === "") return true;

    if (chartType === "scatter") {
      if (!para.xy) return true;
    }

    if (chartType === "line") {
      if (!para.y) return true;
    }

    if (chartType === "bar") {
      if (!para.x || !para.y) return true;
    }

    return false;
  };

  const handleCase1 = () => {
    setCustomCase(1);
  };

  const handleCase2 = () => {
    setCustomCase(2);
  };

  const handleCase3 = () => {
    setCustomCase(3);
  };

  const graph = getLayoutedElements(
    elements,
    direction,
    customLayout,
    customCase
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    graph.filter((el: any) => isNode(el))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    graph.filter((el: any) => isEdge(el))
  );

  useEffect(() => {
    if (customCase !== 0) {
      const graph = getLayoutedElements(
        elements,
        direction,
        customLayout,
        customCase
      );
      setNodes(graph.filter((el) => isNode(el)));
      setEdges(graph.filter((el) => isEdge(el)));
    }
  }, [customCase]);

  useEffect(() => {
    const handleKeyDown = (ev: any) => {
      const keyCode = ev.keyCode;
      if (keyCode === 82) {
        console.log(
          "nodes: ",
          nodes.map((node) => ({ id: node.id, position: node.position }))
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nodes]);

  useEffect(() => {
    const handleKeyDown = (ev: any) => {
      const keyCode = ev.keyCode;
      // console.log(keyCode);
      if (keyCode === 81) {
        handleCase1();
      } else if (keyCode === 87) {
        handleCase2();
      } else if (keyCode === 69) {
        handleCase3();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Card title={title} className={styles.card}>
      <ChartTypeContext.Provider
        value={{
          chartType,
          setChartType,
          para,
          setPara,
        }}
      >
        <div className={styles.top}>
          <div className={styles.title}>
            <div style={{ display: "flex" }}>
              <Button
                type="default"
                className={styles.transform}
                style={{ marginRight: 8 }}
              >
                New Transformation
              </Button>
              <Button
                type="default"
                className={styles.visual}
                style={{ marginRight: 8 }}
              >
                New Visualization
              </Button>
            </div>
            <Button
              onClick={handleConfirm}
              type="default"
              className={styles.btn}
            >
              Confirm
            </Button>
            {/* <div>
              <Button
                onClick={handleCase1}
                type="default"
                className={styles.btn}
              >
                Case 1
              </Button>
              <Button
                onClick={handleCase2}
                type="default"
                className={styles.btn}
                style={{ marginLeft: 8 }}
              >
                Case 2
              </Button>
            </div> */}
          </div>
        </div>
        <div id={styles.container}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // minZoom={preventZoom ? 0.2 : 0.15}
            // maxZoom={preventZoom ? 0.2 : 2}
            minZoom={0.15}
            maxZoom={0.15}
            defaultZoom={0.15}
            fitView
            className={styles.flowchart}
            translateExtent={
              preventTranslate
                ? [
                    [0, 0],
                    [0, 0],
                  ]
                : [
                    [-Infinity, -Infinity],
                    [Infinity, Infinity],
                  ]
            }
          />
        </div>
      </ChartTypeContext.Provider>
    </Card>
  );
};

export default FlowChart;
