/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from "react"
import { useStores } from "../../../models"
import useFetchAllTasks from "../../client/queries/task/tasks"
import {
	createTaskRequest,
	deleteEmployeeFromTasksRequest,
	deleteTaskRequest,
	updateTaskRequest,
} from "../../client/requests/tasks"
import { ICreateTask, ITeamTask } from "../../interfaces/ITask"
import { useSyncRef } from "../useSyncRef"
import { useFirstLoad } from "../useFirstLoad"
import isEqual from "lodash/isEqual"

export function useTeamTasks() {
	const {
		authenticationStore: { tenantId, organizationId, authToken, user },
		teamStore: { activeTeam, activeTeamId },
		TaskStore: {
			teamTasks,
			setTeamTasks,
			setActiveTask,
			activeTaskId,
			setActiveTaskId,
			activeTask,
		},
	} = useStores()

	const tasksRef = useSyncRef(teamTasks)
	const [tasksFetching, setTasksFetching] = useState(false)
	const [createLoading, setCreateLoading] = useState(false)
	const activeTeamRef = useSyncRef(activeTeam)

	const { firstLoad, firstLoadData: firstLoadTaskData } = useFirstLoad()

	// Query Hook
	const {
		data: allTasks,
		isSuccess,
		isFetching,
		isRefetching,
		refetch,
	} = useFetchAllTasks({ tenantId, organizationId, authToken, activeTeamId })

	const deepCheckAndUpdateTasks = useCallback(
		(responseTasks: ITeamTask[], deepCheck?: boolean) => {
			if (responseTasks && responseTasks.length) {
				responseTasks.forEach((task) => {
					if (task.tags && task.tags?.length) {
						task.label = task.tags[0].name
					}
				})
			}

			/**
			 * When deepCheck enabled,
			 * then update the tasks store only when active-team tasks have an update
			 */
			if (deepCheck) {
				const latestActiveTeamTasks = responseTasks
					.filter((task) => {
						return task.teams.some((tm) => {
							return tm.id === activeTeamRef.current?.id
						})
					})
					.sort((a, b) => a.title.localeCompare(b.title))

				const activeTeamTasks = tasksRef.current
					.slice()
					.sort((a, b) => a.title.localeCompare(b.title))

				if (!isEqual(latestActiveTeamTasks, activeTeamTasks)) {
					setTeamTasks(responseTasks)
				}
				const freshActiveTask = responseTasks.find((t) => t.id === activeTaskId)
				if (freshActiveTask && !isEqual(freshActiveTask, activeTask)) {
					setActiveTeamTask(freshActiveTask)
				}
			} else {
				setTeamTasks(responseTasks)
			}
		},
		[setTeamTasks],
	)

	useEffect(() => {
		if (isSuccess) {
			deepCheckAndUpdateTasks(allTasks || [], true)
		}
	}, [allTasks, isSuccess, isRefetching])

	// Reload tasks after active team changed
	useEffect(() => {
		refetch().then((res) => {
			deepCheckAndUpdateTasks(res?.data || [], true)
		})
	}, [activeTeamId, firstLoad])

	// Delete a Task
	const deleteTask = useCallback(
		async (task: (typeof teamTasks)[0]) => {
			const { data } = await deleteTaskRequest({
				tenantId,
				taskId: task.id,
				bearer_token: authToken,
			})

			const affected = data.affected || 0

			if (affected > 0) {
				setTeamTasks((ts) => {
					return ts.filter((t) => t.id !== task.id)
				})
			}

			return data
		},
		[setTeamTasks],
	)

	const createNewTask = useCallback(
		async (
			{ taskName, issueType }: { taskName: string; issueType?: string },
			members?: { id: string }[],
		) => {
			if (taskName.trim().length > 2) {
				const dataBody: ICreateTask = {
					title: taskName,
					status: "open",
					issueType,
					description: "",
					members: user?.employee?.id ? [{ id: user.employee.id }] : [],
					tags: [],
					teams: [
						{
							id: activeTeamId,
						},
					],
					estimate: 0,
					organizationId,
					tenantId,
					...(members ? { members } : {}),
				}
				setCreateLoading(true)
				try {
					const response = await createTaskRequest({
						data: dataBody,
						bearer_token: authToken,
					})
					const { data: created } = response
					refetch()
						.then((res) => {
							const { data: data_1 } = res
							setTeamTasks(data_1)
							const createdTask = data_1.find((t) => t.id === created?.id)
							setActiveTeamTask(createdTask)
						})
						.catch((e) => console.log(e))
				} catch (e_1) {
					return console.log(e_1)
				}
				setCreateLoading(false)
			}
		},
		[activeTeamId],
	)

	// Global loading state
	useEffect(() => {
		if (firstLoad) {
			setTasksFetching(isFetching)
		}
	}, [isFetching, firstLoad])

	// Update a task
	const updateTask = async (task: ITeamTask, id: string) => {
		const { data, response } = await updateTaskRequest({ data: task, id }, authToken)
		refetch()
		return { data, response }
	}

	const updateTitle = useCallback((newTitle: string, task?: ITeamTask | null, loader?: boolean) => {
		if (task && newTitle !== task.title) {
			loader && setTasksFetching(true)
			return updateTask(
				{
					...task,
					title: newTitle,
				},
				task.id,
			).then((res) => {
				setTasksFetching(false)
				return res
			})
		}
		return Promise.resolve()
	}, [])

	const updateDescription = useCallback(
		(newDescription: string, task?: ITeamTask | null, loader?: boolean) => {
			if (task && newDescription !== task.description) {
				loader && setTasksFetching(true)
				return updateTask(
					{
						...task,
						description: newDescription,
					},
					task.id,
				).then((res) => {
					setTasksFetching(false)
					return res
				})
			}
			return Promise.resolve()
		},
		[],
	)

	/**
	 * Change active task
	 */
	const setActiveTeamTask = useCallback(
		(task: ITeamTask | null) => {
			setActiveTask(task)
			setActiveTaskId(task?.id || "")
		},
		[setActiveTask],
	)

	const deleteEmployeeFromTasks = useCallback(
		(employeeId: string, organizationTeamId: string) => {
			deleteEmployeeFromTasksRequest({
				tenantId,
				employeeId,
				organizationTeamId,
				bearer_token: authToken,
			})
		},
		[deleteEmployeeFromTasksRequest],
	)

	return {
		createNewTask,
		deleteTask,
		updateTask,
		setActiveTeamTask,
		updateDescription,
		updateTitle,
		createLoading,
		tasksFetching,
		deleteEmployeeFromTasks,
		teamTasks,
		activeTask,
		activeTaskId,
		isRefetching,
		firstLoadTaskData,
	}
}
