export default function Table({ columns, data, orbits }) {
  const getChartPerOrbit = (orbitName = null) => {
    const dataChart = [];
    data.forEach((element) => {
      if (orbitName == null || element.orbitName === orbitName) {
        dataChart.push(element.data);
      }
    });
    return dataChart;
  };

  const dataTable = getChartPerOrbit(orbits);

  let headers = (
    <tr>
      {columns.map((name, n) => (
        <th key={n}>{name}</th>
      ))}
    </tr>
  );
  // build rows with corresponding properties from the data for each column
  let rows = dataTable.map((item, index) => {
    return (
      <tr>
        <td>{item[0]}</td>
        <td>{item[1]}</td>
        <td>{item[2]}</td>
      </tr>
    );
  });

  //console.log(dataTable);
  return (
    <table className="table">
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
