// cluster deprecated
function clustersLarge(clusters: string[], len: number) {
  const size = clusters.length;
  if (size < len) {
    const rest = new Array(len - size).fill("");
    return rest.reduce((prev, cur) => prev.concat(cur), clusters);
  }
  return clusters;
}

function clustersMerge(clusters: string[][]) {
  let max_len = 0;
  clusters.forEach((cluster) => {
    max_len = Math.max(cluster.length, max_len);
  });
  const newClusters = clusters
    .map((cluster) => clustersLarge(cluster, max_len))
    .reduce((prev, cur) => prev.concat([cur]), []) as string[][];

  // rotate
  const rotateClusters = [];
  for (let i = 0; i < max_len; i++) {
    const rotateCluster = [];
    for (let j = 0; j < newClusters.length; j++) {
      rotateCluster.push(newClusters[j][i]);
    }
    rotateClusters.push(rotateCluster);
  }
  return rotateClusters;
}

export { clustersMerge, clustersLarge };

// 生成linechart props
function generateLineChartProps(
  data: any[],
  legend: any[],
  isCatLine?: boolean,
  symbolSize = 4
): any {
  const xTicks = [] as any[];
  data.forEach((item) => {
    xTicks.push({
      text: item.text,
      x: item.x,
    });
  });
  const series = [] as any[];
  data.forEach((item) => {
    const y = (item?.y ?? []) as any[];
    y.forEach((val, index) => {
      if (!series[index]) {
        series[index] = [];
      }
      series[index] = [...series[index], val];
    });
  });

  return {
    xTicks,
    series: series.map((data, index: number) => ({
      type: isCatLine ? "scatter" : "line",
      data,
      name: legend[index],
      ...(isCatLine ? { symbolSize } : {}),
    })),
  };
}

export { generateLineChartProps };

// 生成barchart props
function generateBarChartProps(data: any[], legend: string[]) {
  const xTicks = [] as any[];
  data.forEach((item) => {
    xTicks.push(item.x);
  });

  const series = [] as any[];
  legend.forEach((text, legendIndex) => {
    const item = {
      name: text,
      type: "bar",
      emphasis: {
        focus: "series",
      },
    } as any;
    const item_data = [] as any;
    data.forEach((obj) => {
      item_data.push(obj.y[legendIndex]);
    });
    item.data = item_data;
    series.push(item);
  });

  return {
    xTicks,
    series,
  };
}

export { generateBarChartProps };

// 判断两个数组是否相等
export function isSameArray(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  const len = arr1.length;
  for (let i = 0; i < len; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
