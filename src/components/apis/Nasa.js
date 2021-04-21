import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const dataColumnTitles = [
  "NEO Name",
  "Min estimated diameter",
  "Max estimated diameter",
];

export default function NasaApi() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          const restructuredData = data.near_earth_objects.map(
            ({ name, estimated_diameter }) => [
              name,
              estimated_diameter.kilometers.estimated_diameter_min,
              estimated_diameter.kilometers.estimated_diameter_max,
            ]
          );
          setItems([dataColumnTitles, ...restructuredData]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Chart
        width={"1000px"}
        height={"3000px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "Information regarding Near-Earth-Objects",
          chartArea: { width: "50%" },
          colors: ["Blue", "Red"],
          hAxis: {
            title: data[0][1],
            minValue: 0,
          },
          vAxis: {
            title: data[0][0],
          },
        }}
      />
    );
  }
}
