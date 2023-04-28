export const TASK_TABLE_NAME = 'apahm23_tasks';
export const PRIZE_TABLE_NAME = 'apahm23_prizes';

export function getAirTableData(table: String) {
  const url =
    `https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=${table}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}
