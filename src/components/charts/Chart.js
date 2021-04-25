/**
 * Botify interview test
 *
 * @version 0.1.0
 * @author [Aman KUMAR](https://github.com/CodeOne45)
 */

import { Chart } from "react-google-charts";

/**
 * Component for Genreating Chart view from a given data
 *
 * @Component
 * @param {*} objects
 *    const columns : title of each colimns for charts
 *    const data : data for to fill charts
 *    const orbits : orbit name for each data/neo
 * @returns (
 *    <Chart columns={dataColumnTitles} data={data} orbits={orbit} />
 * )
 */
export default function ChartGoogle({ columns, data, orbits }) {
  //console.log(dataChart);

  /**
   *
   * @param {*} orbitName - name of the orbit for witch chart is genrated
   * @returns {Array} data - The 2D array of all NEOs that are
   * orbiting a certain orbital body.
   */
  const getChartPerOrbit = (orbitName = null) => {
    const dataChart = [];
    data.forEach((element) => {
      if (orbitName == null || element.orbitName === orbitName) {
        dataChart.push(element.data);
      }
    });

    return [columns, ...dataChart];
  };

  /**
   *
   * @param {*} chart - contains data to generate a Chart
   * @returns{(
   * <Chart columns={dataColumnTitles} data={data} orbits={orbit} /> |
   *  <p></p>)
   */
  function renderChart(chart) {
    if (chart.length > 1) {
      return (
        <Chart
          width={"1000px"}
          height={"1000px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={chart}
          options={{
            title: "Information regarding Near-Earth-Objects",
            chartArea: { width: "50%" },
            colors: ["Blue", "Red"],
            hAxis: {
              title: columns[1],
              minValue: 0,
            },
            vAxis: {
              title: columns[0],
            },
          }}
        />
      );
    } else return <p> There is no neon orbiting this orbit</p>;
  }
  return renderChart(getChartPerOrbit(orbits));
}
