import React, { useEffect, useState } from "react";

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
              estimated_diameter.kilometers.estimated_diameter_max,
              estimated_diameter.kilometers.estimated_diameter_min,
            ]
          );
          setItems(restructuredData);
          //console.log(restructuredData);
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
      <ul>
        {data.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    );
  }
}
