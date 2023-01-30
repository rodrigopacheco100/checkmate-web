import { useMemo } from 'react';

import { useTask } from '~/contexts/tasks';

export const TaskListHeader: React.FC = () => {
  const { tasks } = useTask();

  const { completedTasksAmount, tasksAmount } = useMemo(() => {
    const completedTasksAmount = tasks.filter(task => task.isCompleted).length;
    const tasksAmount = tasks.length;

    return {
      completedTasksAmount,
      tasksAmount
    };
  }, [tasks]);

  return (
    <header className="mt-16 flex justify-between">
      <div className="flex flex-row gap-2">
        <span className="text-checkmate-blue-default">Tarefas criadas</span>
        <span className="flex justify-center items-center bg-checkmate-gray-400 text-white text-xs py-0.5 px-2 rounded-full">
          {tasksAmount}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="text-checkmate-purple-default">Concluídas</span>
        <span className="flex justify-center items-center bg-checkmate-gray-400 text-white text-xs py-0.5 px-2 rounded-full">
          {completedTasksAmount} de {tasksAmount}
        </span>
      </div>
    </header>
  );
};
