import Logo from '~/assets/logo.svg';
import { NextPage, GetServerSideProps } from 'next';
import { FormEvent, useMemo, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type HomeProps = {
  todos: Todo[];
};

const Home: NextPage<HomeProps> = ({ todos: todosFromApi }) => {
  const [todos, setTodos] = useState<Todo[]>(todosFromApi);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const { completedTodosAmount, todosAmount } = useMemo(() => {
    const completedTodosAmount = todos.filter(todo => todo.isCompleted).length;
    const todosAmount = todos.length;

    return {
      completedTodosAmount,
      todosAmount
    };
  }, [todos]);

  const toggleTodoCompleted = (todoId: Todo['id']) => {
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) return;

    setTodos(todos =>
      todos.reduce<Todo[]>((acc, todo, index) => {
        if (todoIndex === index) {
          acc.push({
            ...todo,
            isCompleted: !todo.isCompleted
          });
          return acc;
        }

        acc.push(todo);
        return acc;
      }, [])
    );
  };

  const createTodo = (event: FormEvent) => {
    event.preventDefault();
    const title = newTodoTitle.trim();

    if (title.length === 0) return;

    const id = Math.floor(Math.random() * 1000000000);

    setTodos(todos => [
      ...todos,
      {
        id,
        title: newTodoTitle,
        isCompleted: false
      }
    ]);

    setNewTodoTitle('');
  };

  const deleteTodo = (todoId: Todo['id']) => {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  };

  return (
    <>
      <header className="flex justify-center items-center h-50 bg-checkmate-gray-700">
        <Logo />
      </header>

      <main className="max-w-3xl px-2 mx-auto -mt-6">
        <div className="flex flex-col">
          <form className="flex h-12 gap-2" onSubmit={createTodo}>
            <input
              className="flex-1 bg-checkmate-gray-500 rounded-lg p-4 text-checkmate-gray-300"
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
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
                {todosAmount}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-checkmate-purple-default">Concluídas</span>
              <span className="flex justify-center items-center bg-checkmate-gray-400 text-white text-xs py-0.5 px-2 rounded-full">
                {completedTodosAmount} de {todosAmount}
              </span>
            </div>
          </header>

          <section className="mt-6">
            {todos.map(todo => (
              <div
                className="flex flex-row gap-3 justify-between mb-3 p-4 rounded-lg bg-checkmate-gray-400"
                key={todo.id}
              >
                <label className="flex flex-1 gap-3 text-sm text-checkmate-gray-100" htmlFor={`checkbox-${todo.id}`}>
                  <input
                    className="w-6 h-6 rounded-full border-2 border-checkmate-blue-default bg-transparent hover:bg-checkmate-gray-300 checked:bg-checkmate-purple-dark checked:hover:bg-checkmate-purple-default"
                    id={`checkbox-${todo.id}`}
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodoCompleted(todo.id)}
                  />
                  <span className="overflow-hidden">{todo.title}</span>
                </label>
                <button className="self-start" type="button" onClick={() => deleteTodo(todo.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      todos: [
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
