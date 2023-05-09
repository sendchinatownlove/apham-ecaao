import fs from 'fs';
import axios from 'axios';

const getUsersData = () => {
    const data = fs.readFileSync('scl-scavengerhunt-default-rtdb-export.json', 'utf8');
    const users = JSON.parse(data).users;
    const usersArray = Object.values(users)
                            .map((user: any) => ({
                                ...user, 
                                ...completedTaskCount(user),
                                raffles_entered_count: Object.entries(user.raffles_entered ?? {}).length
                            }));
    return usersArray;
}

const completedTaskCount = (user: any) => {
    const manhattanTasks = Object.entries(user.manhattan_completed_tasks ?? {}).length;
    const brooklynTasks = Object.entries(user.brooklyn_completed_tasks ?? {}).length;
    const queensTasks = Object.entries(user.queens_completed_tasks ?? {}).length;
    const totalTasks = manhattanTasks + brooklynTasks + queensTasks;
    const countData = { 
        manhattan_tasks_count: manhattanTasks, 
        brooklyn_tasks_count: brooklynTasks, 
        queens_tasks_count: queensTasks, 
        total_completed_tasks: totalTasks
    };
    return countData;
}

const users = getUsersData();

const getRaffleData = async () => {
    const raffles = await axios.get('https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=apahm23_prizes');
    return raffles.data;
}

const rafflePromise = getRaffleData();

const getTaskData = async () => {
    const tasks = await axios.get('https://us-central1-scl-scavengerhunt.cloudfunctions.net/airtable_proxy?table=apahm23_tasks');
    return tasks.data;
}

const taskPromise = getTaskData();

Promise.all([taskPromise, rafflePromise]).then(data => {
    const taskData = data[0];
    const raffleData = data[1];

    console.log('User Information');
    console.log(`1. ${users.length} users have signed up`);
    console.log('2. Number of users who have completed:')
    const taskCountFrequency = new Map();
    users.forEach(user => {
        if (!taskCountFrequency.has(user.total_completed_tasks)) {
            taskCountFrequency.set(user.total_completed_tasks, 1);
        } else {
            const taskCount = taskCountFrequency.get(user.total_completed_tasks);
            taskCountFrequency.set(user.total_completed_tasks, taskCount + 1);
        }
    });
    const sortedTaskCountFrequency = new Map([...taskCountFrequency.entries()].sort((a, b) => a[0] - b[0]));
    sortedTaskCountFrequency.forEach((users: number, taskCount: number) => {
        console.log(`\t- ${taskCount} ${taskCount !== 1 ? 'tasks' : 'task'} => ${users} ${users > 1 ? 'users' : 'user'}`);
    });

    console.log('\nTask Information');
    // Total tasks completed and total unique tasks completed
    const uniqueTasksCompleted = new Map();
    const uniqueTasksCount = new Map([
        ['manhattan_completed_tasks', 0],
        ['brooklyn_completed_tasks', 0],
        ['queens_completed_tasks', 0]
    ]);
    const addUniqueTaskCount = (user: any, borough: string) => {
        Object.entries(user[borough] ?? {}).forEach(task => {
            if (!uniqueTasksCompleted.has(task[0])) {
                uniqueTasksCompleted.set(task[0], true);
                const count = uniqueTasksCount.get(borough);
                uniqueTasksCount.set(borough, (count ?? 0) + 1);
            }
        });
    }
    users.forEach(user => {
        addUniqueTaskCount(user, 'manhattan_completed_tasks');
        addUniqueTaskCount(user, 'brooklyn_completed_tasks');
        addUniqueTaskCount(user, 'queens_completed_tasks');
    });
    console.log(`1. ${users.reduce((acc, curr) => acc + curr.total_completed_tasks, 0)} tasks have been completed by all users`);
    console.log(`2. ${[...uniqueTasksCount.values()].reduce((acc, curr) => acc + curr, 0)} unique tasks have been completed overall`);
    console.log(`3. ${users.reduce((acc, curr) => acc + curr.manhattan_tasks_count, 0)} tasks have been completed in Manhattan`);
    console.log(`4. ${uniqueTasksCount.get('manhattan_completed_tasks')} unique tasks have been completed in Manhattan`);
    console.log(`5. ${users.reduce((acc, curr) => acc + curr.brooklyn_tasks_count, 0)} tasks have been completed in Brooklyn`);
    console.log(`6. ${uniqueTasksCount.get('brooklyn_completed_tasks')} unique tasks have been completed in Brooklyn`);
    console.log(`7. ${users.reduce((acc, curr) => acc + curr.queens_tasks_count, 0)} tasks have been completed in Queens`);
    console.log(`8. ${uniqueTasksCount.get('queens_completed_tasks')} unique tasks have been completed in Queens`);

    // Top 10 tasks per borough
    const usersCountFreq = (itemId: string, itemList: any[], titleKey: string) => {
        const countFreq = new Map();
        users.forEach(user => {
            Object.keys(user[itemId] ?? {}).forEach(id => {
                if (!countFreq.has(id)) {
                    countFreq.set(id, 1);
                } else {
                    const currCount = countFreq.get(id);
                    countFreq.set(id, currCount + 1);
                }
            });
        });
        const sortedCountFreq = [...countFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
        sortedCountFreq.forEach((elem, index) => {
            const title = itemList.find((item: any) => item.id === elem[0]).fields[titleKey];
            console.log(`${index + 1}. ${title} => ${elem[1]} users`)
        });
    }
    console.log('\nTop 10 Completed Tasks in Manhattan')
    const manhattanTasks = taskData.filter((task: any) => task.fields.Borough === 'Manhattan');
    usersCountFreq('manhattan_completed_tasks', manhattanTasks, 'Task Title');
    console.log('\nTop 10 Completed Tasks in Brooklyn')
    const brooklynTasks = taskData.filter((task: any) => task.fields.Borough === 'Brooklyn');
    usersCountFreq('brooklyn_completed_tasks', brooklynTasks, 'Task Title');
    console.log('\nTop 10 Completed Tasks in Queens')
    const queensTasks = taskData.filter((task: any) => task.fields.Borough === 'Queens');
    usersCountFreq('queens_completed_tasks', queensTasks, 'Task Title');

    console.log('\nRaffle Information');
    console.log(`1. ${users.reduce((acc, curr) => acc + (curr.tickets_entered ?? 0), 0)} raffle tickets have been submitted across all users`);
    console.log(`2. ${users.reduce((acc, curr) => acc + curr.raffles_entered_count, 0)} raffle entries have been submitted across all users`);

    console.log('\nTop 10 Raffle Items');
    usersCountFreq('raffles_entered', raffleData, 'Prize Title (Brand)');
});