export function getAirTableData() {
  const url =
    'https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy';

  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log('data:', data))
    .catch((err) => console.error(err));
}
