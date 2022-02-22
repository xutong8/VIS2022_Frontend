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
