import fs from 'fs';

// Read the JSON file
const data = fs.readFileSync('scl-scavengerhunt-default-rtdb-export.json', 'utf-8');
const { users } = JSON.parse(data);

// 1. Top 10 users by the number of tasks completed
const usersWithTaskCounts = Object.entries(users).map(([userId, user]) => {
  const brooklynTasks = Object.keys(user.brooklyn_completed_tasks || {}).length;
  const manhattanTasks = Object.keys(user.manhattan_completed_tasks || {}).length;
  const queensTasks = Object.keys(user.queens_completed_tasks || {}).length;
  const totalTasks = brooklynTasks + manhattanTasks + queensTasks;
  return { userId, totalTasks };
});
const topUsersByTasks = usersWithTaskCounts.sort((a, b) => b.totalTasks - a.totalTasks).slice(0, 10);

// 2. Top 10 boroughs by the number of tasks completed
const boroughTaskCounts = { Brooklyn: 0, Manhattan: 0, Queens: 0 };
for (const user of Object.values(users)) {
  boroughTaskCounts.Brooklyn += Object.keys(user.brooklyn_completed_tasks || {}).length;
  boroughTaskCounts.Manhattan += Object.keys(user.manhattan_completed_tasks || {}).length;
  boroughTaskCounts.Queens += Object.keys(user.queens_completed_tasks || {}).length;
}
const topBoroughsByTasks = Object.entries(boroughTaskCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

// 3. Top 10 users by the number of raffle tickets entered
const usersWithTicketCounts = Object.entries(users).map(([userId, user]) => {
  const totalTickets = user.tickets_entered || 0;
  return { userId, totalTickets };
});
const topUsersByTickets = usersWithTicketCounts.sort((a, b) => b.totalTickets - a.totalTickets).slice(0, 10);

// 4. Average number of tasks completed per user
const totalTasksCompleted = Object.values(users).reduce((total, user) => {
  const brooklynTasks = Object.keys(user.brooklyn_completed_tasks || {}).length;
  const manhattanTasks = Object.keys(user.manhattan_completed_tasks || {}).length;
  const queensTasks = Object.keys(user.queens_completed_tasks || {}).length;
  return total + brooklynTasks + manhattanTasks + queensTasks;
}, 0);
const averageTasksPerUser = totalTasksCompleted / Object.keys(users).length;

// Log the results
console.log('Top 10 users by tasks completed:', topUsersByTasks);
console.log('Top 10 boroughs by tasks completed:', topBoroughsByTasks);
console.log('Top 10 users by raffle tickets entered:', topUsersByTickets);
console.log('Average tasks completed per user:', averageTasksPerUser);
