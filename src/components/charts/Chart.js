import { Chart } from "react-google-charts";

export default function ChartGoogle(props) {
  return (
    <Chart
      width={"1000px"}
      height={"1000px"}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={props.data}
      options={{
        title: "Information regarding Near-Earth-Objects",
        chartArea: { width: "50%" },
        colors: ["Blue", "Red"],
        hAxis: {
          title: props.h_Ord,
          minValue: 0,
        },
        vAxis: {
          title: props.v_Axis,
        },
      }}
    />
  );
}
