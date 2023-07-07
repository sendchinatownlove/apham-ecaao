const functions = require("firebase-functions");

exports.getTotalDonations = functions.https.onRequest(async (req, res) => {
    const { Client, Environment } = require("square");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

const { ordersApi } = client;

    res.set("Access-Control-Allow-Origin", "*");

    res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

    try {
        functions.logger.log("Sending request to Square");

        const response = await client.ordersApi.searchOrders({
            locationIds: [
              'LJQ6T0REE7VS6'
            ],
            query: {
              filter: {
                stateFilter: {
                  states: [
                    'COMPLETED'
                  ]
                }
              }
            }
          });
        
        const rollUp = response.result.orders.reduce((accumulator, order) => {
            return accumulator + Number(order.totalMoney.amount);
          }, 0);

        const totalMoney = rollUp.toFixed(2);

        res.status(200).send(totalMoney);
    } catch (err) {
        functions.logger.error("Error fetching results from Square", err);
        res.status(500).send(err);
    }
})