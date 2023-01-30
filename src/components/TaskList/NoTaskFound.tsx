import ClipboardIcon from '~/assets/clipboard.svg';

export const NoTaskFoundView: React.FC = () => {
  return (
    <div className="mt-16 flex flex-col text-checkmate-gray-300 text-base items-center">
      <ClipboardIcon />
      <b className="mt-4">Você ainda não tem tarefas cadastradas</b>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
};
