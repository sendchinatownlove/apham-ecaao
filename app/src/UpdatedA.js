import fs from 'fs';
import fetch from 'node-fetch';

// Read the JSON file
const data = fs.readFileSync('../../0503.json', 'utf-8');
const { users } = JSON.parse(data);

// Define a function to fetch task data from the API
const fetchTaskData = async () => {
  const response = await fetch('https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=APAHM23_Tasks');
  const taskData = await response.json();
  return taskData;
};


// Fetch task data from the API
fetchTaskData().then((taskData) => {
  // Create a mapping of task IDs to task titles
  const taskTitles = taskData.reduce((acc, task) => {
    acc[task.id] = task.fields['Task Title'];
    return acc;
  }, {});

  // 1. Top 10 users by the number of tasks completed
  const usersWithTaskCounts = Object.entries(users).map(([userId, user]) => {
    const brooklynTasks = Object.keys(user.brooklyn_completed_tasks || {}).length;
    const manhattanTasks = Object.keys(user.manhattan_completed_tasks || {}).length;
    const queensTasks = Object.keys(user.queens_completed_tasks || {}).length;
    const totalTasks = brooklynTasks + manhattanTasks + queensTasks;
    const email = user.email;
    return { userId, email, totalTasks };
    // return { userId, email, totalTasks };
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
  console.log('Top 10 users by tasks completed:', topUsersByTasks);
  console.log('Top 10 boroughs by tasks completed:', topBoroughsByTasks);

  // 3. Top 10 users by the number of raffle tickets entered
  const usersWithTicketCounts = Object.entries(users).map(([userId, user]) => {
    const totalTickets = user.tickets_entered || 0;
    const email = user.email;
    return { userId, email, totalTickets };
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
  console.log('Top 10 users by raffle tickets entered:', topUsersByTickets);
  console.log('Average tasks completed per user:', averageTasksPerUser);

  // Additional analysis: List of tasks completed by each of the top 10 users
  console.log('Tasks completed by top 10 users:');
  topUsersByTasks.forEach(user => {
    const { userId, email } = user;
    const userData = users[userId];
    const brooklynTasks = Object.keys(userData.brooklyn_completed_tasks || {}).map(taskId => taskTitles[taskId]);
    const manhattanTasks = Object.keys(userData.manhattan_completed_tasks || {}).map(taskId => taskTitles[taskId]);
    const queensTasks = Object.keys(userData.queens_completed_tasks || {}).map(taskId => taskTitles[taskId]);
    const allTasks = [...brooklynTasks, ...manhattanTasks, ...queensTasks];
    console.log(`User: ${email}, Tasks: ${allTasks.join(', ')}`);
  });
}).catch(error => {
  console.error('Error fetching task data:', error);
});