// table can be apahm23_tasks (Tasks) or apahm23_prizes (Prizes)
export function getAirTableData(table: String) {
  const url =
    `https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=${table}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}