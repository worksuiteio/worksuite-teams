import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DeleteTask from "../delete-task";
import { useTeamTasks } from "@app/hooks/useTeamTasks";
import { ITaskStatus, ITeamTask } from "@app/interfaces/ITask";
import { Spinner } from "../spinner";
import { BadgedTaskStatus } from "./dropdownIcons";

function TaskItem({
  selected,
  item,
  active,
  onDelete,
}: {
  selected: boolean;
  item: ITeamTask;
  active: boolean;
  onDelete: () => void;
}) {
  return (
    <>
      <span
        className={`truncate h-[30px] flex items-center ${
          selected ? "font-medium" : "font-normal"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {item.title}
          <div className="flex items-center space-x-4">
            <BadgedTaskStatus status={item.status} />
            <div className="flex items-center justify-center space-x-1">
              {item.members &&
                item.members.map((member, i) => (
                  <div className="flex justify-center items-center" key={i}>
                    <Image
                      src={member.user?.imageUrl || ""}
                      alt={
                        (member.user?.firstName || "") +
                        " " +
                        (member.user?.lastName || "")
                      }
                      width={30}
                      height={30}
                    />
                  </div>
                ))}{" "}
            </div>

            <XMarkIcon
              className="w-5 h-5 text-gray-400 hover:text-primary"
              onClick={onDelete}
            />
          </div>
        </div>
      </span>
      {selected ? (
        <span
          className={`absolute inset-y-0 left-0 flex items-center dark:text-white text-primary pl-3`}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );
}

function CreateTaskOption({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <div
      className="relative cursor-pointer select-none py-2 px-4 text-gray-700"
      onClick={!loading ? onClick : undefined}
    >
      <div className="flex items-center justify-start cursor-pointer text-primary dark:text-white">
        <span className="mr-[11px]">
          {loading ? (
            <Spinner dark={false} />
          ) : (
            <PlusIcon className=" font-bold w-[16px] h-[16px]" />
          )}
        </span>
        Create new
      </div>
    </div>
  );
}

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    closeModal,
    openModal,
  };
}

export default function TaskInput() {
  const { isOpen, openModal, closeModal } = useModal();
  const [task, setTask] = useState<ITeamTask | null>(null);
  const {
    tasks,
    activeTeamTask,
    setActiveTask,
    createLoading,
    tasksFetching,
    createTask,
  } = useTeamTasks();

  const handleOpenModal = (concernedTask: ITeamTask) => {
    setTask(concernedTask);
    openModal();
  };

  const [query, setQuery] = useState("");

  const filteredTasks = useMemo(() => {
    return query.trim() === ""
      ? tasks
      : tasks.filter((task) =>
          task.title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "")
            .startsWith(query.toLowerCase().replace(/\s+/g, ""))
        );
  }, [query, tasks]);

  const hasCreateForm = filteredTasks.length === 0 && query !== "";

  const handleTaskCreation = () => {
    if (query.trim().length < 2) return;
    createTask(query.trim()).then((res) => {
      setQuery("");
      const items = res.data?.items || [];
      const created = items.find((t) => t.title === query.trim());
      if (created) setActiveTask(created);
    });
  };

  return (
    <div className="w-full">
      <Combobox value={activeTeamTask} onChange={setActiveTask}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg  bg-[#EEEFF5] dark:bg-[#1B1B1E] text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ">
            <Combobox.Input
              className="h-[60px] bg-[#EEEFF5] dark:bg-[#1B1B1E] placeholder-[#9490A0] dark:placeholder-[#616164] w-full rounded-[10px] px-[20px] py-[18px] shadow-inner"
              displayValue={(task: ITeamTask) => task && task.title}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              placeholder="What you working on?"
              readOnly={tasksFetching}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {tasksFetching ? (
                <Spinner dark={false} />
              ) : (
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => !createLoading && setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#FFFFFF] dark:bg-[#1B1B1E] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {hasCreateForm ? (
                <CreateTaskOption
                  onClick={handleTaskCreation}
                  loading={createLoading}
                />
              ) : (
                filteredTasks.map((task) => {
                  return (
                    <Combobox.Option
                      key={task.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-[#F9FAFB] text-primary dark:text-white dark:bg-[#202023] cursor-pointer"
                            : "text-gray-900 dark:text-white"
                        }`
                      }
                      value={task}
                    >
                      {({ selected, active }) => {
                        return (
                          <TaskItem
                            selected={selected}
                            active={active}
                            item={task}
                            onDelete={() => handleOpenModal(task)}
                          />
                        );
                      }}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <DeleteTask
        isOpen={isOpen}
        closeModal={closeModal}
        Fragment={Fragment}
        task={task}
      />
    </div>
  );
}
