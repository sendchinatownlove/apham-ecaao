import {Activities} from "../components/tasks/TaskList";

export function getNumberOfCompletedActivities(activities: Activities[]) {
    let completedActivities = 0;
    activities.forEach((activity: Activities) => {
        if (activity.activity.completed) {
            completedActivities += 1;
        }
    });

    return completedActivities;
}