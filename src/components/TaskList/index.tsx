import { useTask } from '~/contexts/tasks';
import { NoTaskFoundView } from './NoTaskFound';
import { ListView } from './List';
import { TaskListHeader } from './Header';

export const TaskList: React.FC = () => {
  const { tasks } = useTask();

  return (
    <>
      <TaskListHeader />

      {tasks.length > 0 ? <ListView /> : <NoTaskFoundView />}
    </>
  );
};
