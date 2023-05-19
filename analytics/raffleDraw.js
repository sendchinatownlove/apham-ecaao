const fs = require('fs');
const axios = require('axios');

/**
 * 
 * @returns bucket of all ticket entry to all prize
 */
function generateTicketID() {
  const jsonData = fs.readFileSync('scl-scavengerhunt-default-rtdb-export.json', 'utf8');
  const data = JSON.parse(jsonData);
  const output = [];

  for (let userId in data.users) {
    if (data.users.hasOwnProperty(userId)) {
      const user = data.users[userId];
      if (user.hasOwnProperty("raffles_entered")) {
        const raffles = user.raffles_entered;
        for (let raffleId in raffles) {
          if (raffles.hasOwnProperty(raffleId)) {
            const numTickets = raffles[raffleId].entries;
            for (let i = 1; i <= numTickets; i++) {
              //each ticketID consist of the prizeId and the user's email
              const ticketID = `${raffleId}_${user.email}`;
              output.push(ticketID);
            }
          }
        }
      }
    }
  }
  return output;
}

/**
 * 
 * @param {string} prizeId 
 * @param {number} drawCount 
 * @param {array} allEntry //Output of generateTicketID
 * 
 * output on terminal the winners of the a given prize draw
 */
const drawRaffle = (prizeId, drawCount, allEntry) => {
  //filter the bucket only for the given prize we are drawing for
  const ticketBucket = allEntry.filter(ticket => ticket.startsWith(prizeId));
  console.log("All Entry", ticketBucket);
  for (let i = 1; i <= drawCount; i++) {
    const randomIndex = Math.floor(Math.random() * ticketBucket.length);
    const randomTicket = ticketBucket[randomIndex];
    console.log("Draw", i);
    console.log("Selected Ticket:", randomTicket?.slice(prizeId.length + 1));
    // Remove the selected ticket from the bucket to ensure it is not drawn again
    ticketBucket.splice(randomIndex, 1);
  }
};

// drawRaffle("rec6dKAceUHsZtJOd",2,generateTicketID());

/**
 * 
 * fetch Airtable prize list and draw all winners!
 */
const drawAll = async() => {

  const ticketBucket = generateTicketID();
  //fetch prize id
  const { data } = await axios.get("https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=apahm23_prizes")

  //loop through each prize in airTable and draw based on if Item Description specify more than 1 winner
  for(i = 0; i < data.length; i ++){
    console.log("-----------------------------")

    //draw 3 winners
    if(data[i].fields["Item Description"].includes("(Three winners will be drawn.)")){
      console.log(`Drawing 3 winners for ${data[i].fields["Prize Title (Brand)"]} ${data[i].fields["Prize Subtitle (Item)"]}`)

      drawRaffle(data[i].id,3,ticketBucket);

    //draw 2 winners
    }else if(data[i].fields["Item Description"].includes("(Two winners will be drawn.)")){
      console.log(`Drawing 2 winners for ${data[i].fields["Prize Title (Brand)"]} ${data[i].fields["Prize Subtitle (Item)"]}`)

      drawRaffle(data[i].id,2,ticketBucket);

    //draw 1 winners
    }else {
      console.log(`Drawing 1 winner for ${data[i].fields["Prize Title (Brand)"]} ${data[i].fields["Prize Subtitle (Item)"]}`)

      drawRaffle(data[i].id,1,ticketBucket);
    }
  }
}

drawAll()