/**
 * 
 * @param {JSON} data 
 * @returns array of unique ticketId for each ticket entered
 * the terminal will print out informations by user and then just the output of unique ticketId
 */
const generateTicketID = (data) => {
  console.log("=================")
  console.log("Generate TicketID")
  console.log("=================")
  const output = [];

  for (let userId in data.users) {
    if (data.users.hasOwnProperty(userId)) {
      const user = data.users[userId];

      if (user.hasOwnProperty("raffles_entered")) {
        console.log("User ID:", userId);
        console.log("Email:", user.email);
        console.log("Raffles Entered:");

        const raffles = user.raffles_entered;

        for (let raffleId in raffles) {
          if (raffles.hasOwnProperty(raffleId)) {
            console.log("Prize ID:", raffleId);
            console.log("Number of Tickets Entered:", raffles[raffleId].entries);

            const numTickets = raffles[raffleId].entries;
            for (let i = 1; i <= numTickets; i++) {
              const ticketID = `${raffleId}_${userId}_${i}`;
              console.log("Ticket ID:", ticketID);
              output.push(ticketID);
            }
          }
        }

        console.log("------------------------------------");
      }
    }
  }
  console.log("All Tickets' Unique ID");
  console.log(output);
  console.log("=====================")
  console.log("End Generate TicketID")
  console.log("=====================")
  return output;
};

const drawRaffle = (prizeId, drawCount, allEntry) => {
  console.log("============")
  console.log("Draw Raffles")
  console.log("============")
  const ticketBucket = allEntry.filter(ticket => ticket.startsWith(prizeId));
  console.log(ticketBucket);
  console.log("------------------------------------");
  for(let i = 0; i <=drawCount; i++){

  }
}


drawRaffle("rec0U5cmo64ot4C3N",1,generateTicketID(JSON));
