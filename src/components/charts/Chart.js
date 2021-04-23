import { Chart } from "react-google-charts";

export default function ChartGoogle({ columns, data, orbits }) {
  //console.log(dataChart);

  const getChartPerOrbit = (orbitName = null) => {
    const dataChart = [];
    data.forEach((element) => {
      if (orbitName == null || element.orbitName === orbitName) {
        dataChart.push(element.data);
      }
    });

    return [columns, ...dataChart];
  };

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
}
