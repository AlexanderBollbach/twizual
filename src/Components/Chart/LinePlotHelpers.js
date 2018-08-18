import { voronoi } from "d3-voronoi";

function uniq(a, selector) {
  var seen = {};

  return a.filter(
    item =>
      seen.hasOwnProperty(selector(item))
        ? false
        : (seen[selector(item)] = true)
  );
}

export const voronoiData = (dataMap, lines) => {
  let formatted = lines.reduce((prevLine, currLine) => {
    let zipped = currLine.data.map(datum => ({
      id: currLine.id,
      datum: datum
    }));

    return prevLine.concat(zipped);
  }, []);

  let uniqued = uniq(
    formatted,
    el =>
      `${Math.round(dataMap.xScale(dataMap.selectX(el.datum)))}-${Math.round(
        dataMap.yScale(dataMap.selectY(el.datum))
      )}`
  );

  let v = voronoi()
    .x(d => dataMap.xScale(dataMap.selectX(d.datum)))
    .y(d => dataMap.yScale(dataMap.selectY(d.datum)))
    .extent([[0, 0], [100, 100]]);

  let mappedToData = v.polygons(uniqued).map(poly => {
    return { path: `M ${poly.join("L")} Z`, data: poly.data };
  });

  return mappedToData;
};
