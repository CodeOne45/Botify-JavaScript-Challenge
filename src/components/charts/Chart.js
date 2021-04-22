import { Chart } from "react-google-charts";

export default function ChartGoogle({ columns, data }) {
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

  const chart = getChartPerOrbit("Mars");
  //console.log(chart);

  function renderChart() {
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
              title: columns[0][1],
              minValue: 0,
            },
            vAxis: {
              title: columns[0][0],
            },
          }}
        />
      );
    } else return <p> There is no neon orbiting this orbit</p>;
  }

  function renderSelect() {
    let selectCategory = (e) => {
      console.log(e.target.value + " is selected");
    };
    return (
      <select id="lang" onChange={selectCategory}>
        <option value="Earth">Earth</option>
        <option value="Jupyter">Jupyter</option>
        <option value="Mars"> Mars</option>
        <option value="Merc"> Merc</option>
      </select>
    );
  }

  return <div>{renderChart()}</div>;
}
