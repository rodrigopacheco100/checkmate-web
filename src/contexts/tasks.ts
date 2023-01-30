import { create } from 'zustand';

import { Task } from '~/types/task';

type TaskContextProps = {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  toggleTaskCompleted: (taskId: Task['id']) => void;
  deleteTask: (taskId: Task['id']) => void;
  addTask: (newTaskTitle: Task['title']) => void;
};

export const useTask = create<TaskContextProps>(set => ({
  isLoading: false,

  tasks: [],

  fetchTasks: async () => {
    set({
      isLoading: true
    });

    await new Promise(resolve => {
      setTimeout(() => resolve(''), 1000);
    });

    set({
      tasks: [
        {
          id: 1,
          title: 'Tempor amet Lorem eiusmod excepteur nisi eu cillum incididunt.',
          isCompleted: false
        },
        {
          id: 2,
          title: 'Reprehenderit irure occaecat tempor culpa sint qui.',
          isCompleted: true
        }
      ],
      isLoading: false
    });
  },

  addTask: newTaskTitle =>
    set(state => {
      const title = newTaskTitle.trim();

      if (title.length === 0) return {};

      const id = Math.floor(Math.random() * 1000000000);

      return {
        tasks: [
          ...state.tasks,
          {
            id,
            title: newTaskTitle,
            isCompleted: false
          }
        ]
      };
    }),

  toggleTaskCompleted: taskId =>
    set(state => {
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);

      if (taskIndex < 0) return {};

      return {
        tasks: state.tasks.reduce<Task[]>((acc, task, index) => {
          if (taskIndex === index) {
            acc.push({
              ...task,
              isCompleted: !task.isCompleted
            });
            return acc;
          }

          acc.push(task);
          return acc;
        }, [])
      };
    }),

  deleteTask: taskId =>
    set(state => {
      return {
        tasks: state.tasks.filter(task => task.id !== taskId)
      };
    })
}));
