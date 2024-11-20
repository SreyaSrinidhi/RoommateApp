import React from 'react';
import { TaskBoardProvider } from './Context';
import TaskBoardNavigator from './TaskBoardNavigator';

const TaskBoard = () => {
    return (
        <TaskBoardProvider>
            <TaskBoardNavigator />
        </TaskBoardProvider>
    );
};

export default TaskBoard;
