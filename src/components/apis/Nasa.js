/**
 * Botify interview test
 *
 * @version 0.1.0
 * @author [Aman KUMAR](https://github.com/CodeOne45)
 */

import React, { useEffect, useState } from "react";
import Chart from "../charts/Chart.js";
import Select from "react-select";
import Table from "../table/Table.js";

const dataColumnTitles = [
  "NEO Name",
  "Min estimated diameter (km)",
  "Max estimated diameter",
];

/**
 * Component for Genreating main view based on Api dat and user choice
 *
 * @Component
 * @returns ({<Chart columns={dataColumnTitles} data={data} orbits={orbit} /> |
 * <Table columns={dataColumnTitles} data={data} orbits={orbit} /> |
 * <Select onChange={selectCategory} options={orbitsList} /> })
 */
export default function NasaApi() {
  // Select parameters  & functions
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

  // Button parameters & functions
  const [displayChart, setDisplayChart] = useState(false);
  let [txt_btn, setTxtBtn] = useState("Table View");

  let changeText = () => {
    // change some state here
    if (txt_btn === "Table View") {
      setTxtBtn("Chart View");
    } else setTxtBtn("Table View");
    setDisplayChart(!displayChart);
  };

  // Api parameters & functions
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
  });

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

  // Genrate view depending on the data given by Api and user choice
  if (error) {
    return <div>Error : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="neoChart">
        <button
          className="btn_table"
          onClick={() => {
            changeText();
          }}
        >
          {txt_btn}
        </button>
        {displayChart ? (
          <Chart columns={dataColumnTitles} data={data} orbits={orbit} />
        ) : (
          <Table columns={dataColumnTitles} data={data} orbits={orbit} />
        )}

        <div className="selectOrib">
          {" "}
          <Select onChange={selectCategory} options={orbitsList} />{" "}
        </div>
      </div>
    );
  }
}

/**
 *
 * @param {*} dateObject
 * @returns Date : YYYYMMDD
 */
function formatDate(dateObject) {
  let year = dateObject.getFullYear();

  let month = dateObject.getMonth() + 1;
  if (month < 10) month = "0" + month;

  let day = dateObject.getDate();
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
}
