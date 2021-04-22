import React, { useEffect, useState } from "react";
import Chart from "../charts/Chart.js";

const dataColumnTitles = [
  "NEO Name",
  "Min estimated diameter (km)",
  "Max estimated diameter",
];

export default function NasaApi() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=FyJrQyUlpgQ0XFxZuOEarAZ8JtTYvXXr7fNPDazi")
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
        data={data}
      />
    );
  }
}
