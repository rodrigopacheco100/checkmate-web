import { FormEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { useTask } from '~/contexts/tasks';
import { TaskList } from '~/components/TaskList';
import Logo from '~/assets/logo.svg';

const Home: NextPage = () => {
  const { addTask, fetchTasks, isLoading } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();
    addTask(newTaskTitle);

    setNewTaskTitle('');
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <header className="flex justify-center items-center h-50 bg-checkmate-gray-700">
        <Logo />
      </header>

      <main className="max-w-3xl px-2 mx-auto -mt-6">
        <div className="flex flex-col">
          <form className="flex h-12 gap-2" onSubmit={handleCreateTask}>
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

          <TaskList />
        </div>
      </main>
    </>
  );
};

export default Home;
