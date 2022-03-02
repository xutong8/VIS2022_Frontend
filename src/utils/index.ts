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

// linechart生成x_ticks
function generateLineChartProps(data: any[]): any {
  const xTicks = [] as any[];
  data.forEach((item) => {
    xTicks.push({
      text: item.text,
      x: item.x
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
    series: series.map((data) => ({
      type: "line",
      data,
    })),
  };
}

export { generateLineChartProps };
