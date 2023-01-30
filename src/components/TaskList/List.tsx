import { useTask } from '~/contexts/tasks';

export const ListView: React.FC = () => {
  const { tasks, deleteTask, toggleTaskCompleted } = useTask();

  return (
    <ul className="mt-6">
      {tasks.map(task => (
        <li className="flex flex-row gap-3 justify-between mb-3 p-4 rounded-lg bg-checkmate-gray-400" key={task.id}>
          <label className="flex flex-1 gap-3" htmlFor={`checkbox-${task.id}`}>
            <input
              className="w-6 h-6 rounded-full border-2 border-checkmate-blue-default bg-transparent hover:bg-checkmate-gray-300 checked:bg-checkmate-purple-dark checked:hover:bg-checkmate-purple-default"
              id={`checkbox-${task.id}`}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompleted(task.id)}
            />
            <span
              className={`overflow-hidden text-sm
                  ${task.isCompleted ? 'text-checkmate-gray-300 line-through' : 'text-checkmate-gray-100'}
                `}
            >
              {task.title}
            </span>
          </label>
          <button className="self-start" type="button" onClick={() => deleteTask(task.id)}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
};
