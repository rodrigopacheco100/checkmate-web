import Logo from '~/assets/logo.svg';
import { NextPage, GetServerSideProps } from 'next';
import { FormEvent, useMemo, useState } from 'react';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type HomeProps = {
  tasks: Task[];
};

const Home: NextPage<HomeProps> = ({ tasks: tasksFromApi }) => {
  const [tasks, setTasks] = useState<Task[]>(tasksFromApi);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { completedTasksAmount, tasksAmount } = useMemo(() => {
    const completedTasksAmount = tasks.filter(task => task.isCompleted).length;
    const tasksAmount = tasks.length;

    return {
      completedTasksAmount,
      tasksAmount
    };
  }, [tasks]);

  const toggleTaskCompleted = (taskId: Task['id']) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex < 0) return;

    setTasks(tasks =>
      tasks.reduce<Task[]>((acc, task, index) => {
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
    );
  };

  const createTask = (event: FormEvent) => {
    event.preventDefault();
    const title = newTaskTitle.trim();

    if (title.length === 0) return;

    const id = Math.floor(Math.random() * 1000000000);

    setTasks(tasks => [
      ...tasks,
      {
        id,
        title: newTaskTitle,
        isCompleted: false
      }
    ]);

    setNewTaskTitle('');
  };

  const deleteTask = (taskId: Task['id']) => {
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
      <header className="flex justify-center items-center h-50 bg-checkmate-gray-700">
        <Logo />
      </header>

      <main className="max-w-3xl px-2 mx-auto -mt-6">
        <div className="flex flex-col">
          <form className="flex h-12 gap-2" onSubmit={createTask}>
            <input
              className="flex-1 bg-checkmate-gray-500 rounded-lg p-4 text-checkmate-gray-300"
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
            />
            <button
              className="w-24 bg-gradient-to-r from-checkmate-blue-default to-checkmate-purple-dark rounded-lg font-bold text-white text-sm"
              type="submit"
            >
              Adicionar
            </button>
          </form>

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

          <ul className="mt-6">
            {tasks.map(task => (
              <li
                className="flex flex-row gap-3 justify-between mb-3 p-4 rounded-lg bg-checkmate-gray-400"
                key={task.id}
              >
                <label className="flex flex-1 gap-3 text-sm text-checkmate-gray-100" htmlFor={`checkbox-${task.id}`}>
                  <input
                    className="w-6 h-6 rounded-full border-2 border-checkmate-blue-default bg-transparent hover:bg-checkmate-gray-300 checked:bg-checkmate-purple-dark checked:hover:bg-checkmate-purple-default"
                    id={`checkbox-${task.id}`}
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleTaskCompleted(task.id)}
                  />
                  <span className="overflow-hidden">{task.title}</span>
                </label>
                <button className="self-start" type="button" onClick={() => deleteTask(task.id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
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
      ]
    }
  };
};

export default Home;
