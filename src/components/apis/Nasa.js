import React, { useEffect, useState } from "react";
import Chart from "../charts/Chart.js";
import Select from "react-select";

const dataColumnTitles = [
  "NEO Name",
  "Min estimated diameter (km)",
  "Max estimated diameter",
];

export default function NasaApi() {
  // Select parameters
  let [orbit, setorbit] = useState("Earth");

  const orbitsList = [
    { label: "Earth", value: "Earth" },
    { label: "Jupyter", value: "Jupyter" },
    { label: "Mars", value: "Mars" },
    { label: "Merc", value: "Merc" },
  ];

  let selectCategory = (e) => {
    console.log(e.value);
    setorbit(e.value);
  };

  // Api parameters

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setItems] = useState([]);
  let today = formatDate(new Date());
  let startdate = formatDate(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startdate}&end_date=${today}&detailed=false&api_key=FyJrQyUlpgQ0XFxZuOEarAZ8JtTYvXXr7fNPDazi`;
  useEffect(() => {
    fetchURL(url);
  }, []);

  async function fetchURL(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      //console.log(data);
      setIsLoaded(true);
      const dataChart = [];
      data.near_earth_objects[today].forEach(
        ({ name, estimated_diameter, close_approach_data }) => {
          dataChart.push({
            data: [
              name,
              estimated_diameter.kilometers.estimated_diameter_min,
              estimated_diameter.kilometers.estimated_diameter_max,
            ],
            orbitName: close_approach_data[0].orbiting_body,
          });
        }
      );

      setItems(dataChart);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="neoChart">
        <Chart columns={dataColumnTitles} data={data} orbits={orbit} />;
        <div className="selectOrib">
          {" "}
          <Select onChange={selectCategory} options={orbitsList} />{" "}
        </div>
      </div>
    );
  }
}

function formatDate(dateObject) {
  let year = dateObject.getFullYear();

  let month = dateObject.getMonth() + 1;
  if (month < 10) month = "0" + month;

  let day = dateObject.getDate();
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
}
