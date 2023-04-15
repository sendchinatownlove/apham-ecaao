import {TaskListData} from '../components/tasks/TaskList';

export const taskListData: TaskListData[] = [
    {
        location: 'manhattan',
        totalActivities: 33,
        activitiesCompleted: 0,
        activities: [
            {
                activity: {
                    title: 'Visit 47 Division St Trading Inc., Chinatown’s oldest meat shop, to buy some produce!',
                    description: 'They sell dried goods, eggs, and various cuts of meat. A true community staple, they try to keep their prices low (at wholesale prices) to serve their customer base, many of whom are aunties and grandmas who are on food assistance and have limited income.',
                    completed: true
                }
            },
            {
                activity: {
                    title: 'Grab a caffeinated drink at Dreamers Coffee House (54W Henry St)!',
                    description: 'Say hello to Daniel and Sandy, the two owners who built Dreamers Coffee House as a casual spot for locals and newcomers alike to mingle. They find joy in providing a space for the community to come together over coffee.',
                    completed: false
                }
            },
            {
                activity: {
                    title: 'Slurp on some noodles at Lanzhou Ramen (107 E Broadway).',
                    description: 'A cornerstone of Little Fuzhou since 2002, Lanzhou Ramen is a local favorite for its lā miàn. John, the owner and head chef, started working in restaurants at the age of 15 and has continued doing so ever since.',
                    completed: false
                }
            },
            {
                activity: {
                    title: 'Purchase any small bag of tea at Grand Tea & Imports (298 Grand St, New York, NY 10002).',
                    description: 'Since 2006, Grand Tea & Imports has been a Chinatown staple for folks looking for unique tea blends, spiritual goods and niche Chinese cultural items.',
                    completed: false
                }
            },
            {
                activity: {
                    title: 'Order any rice noodle of your choice at Mee Sum Cafe.',
                    description: 'Established in the late 1960s, Mee Sum Cafe is one of the last old-school cafes in Chinatown. For more than 50 years, it has served a variety of classic dimsum dishes — from beef rice noodle rolls to shrimp dumplings to zongzi, and built up a reputation for its breakfast coffee and Cantonese comfort food.',
                    completed: false
                }
            },
        ]
    },
    {
        location: 'brooklyn',
        totalActivities: 33,
        activitiesCompleted: 0,
        activities: []
    },
    {
        location: 'queens',
        totalActivities: 33,
        activitiesCompleted: 0,
        activities: []
    }
];