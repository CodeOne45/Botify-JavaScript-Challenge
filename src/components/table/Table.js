/**
 * Botify interview test
 *
 * @version 0.1.0
 * @author [Aman KUMAR](https://github.com/CodeOne45)
 */

/**
 * Component for Genreating Table view from a given data
 *
 * @Component
 * @param {*} objects
 *    const columns : title of each colimns for charts
 *    const data : data for to fill charts
 *    const orbits : orbit name for each data/neo
 * @returns (
 *    <Table columns={dataColumnTitles} data={data} orbits={orbit} />
 * )
 */
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
        <td key={index}>{item[0]}</td>
        <td key={index}>{item[1]}</td>
        <td key={index}>{item[2]}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
