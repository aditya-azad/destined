export interface Todo {
  body: string,
  date: string,
  time: string,
  done: boolean
}

export interface TodoModifyPayload {
  todo: Todo,
  id: string
}

export interface TodoProps {
  shouldDisplayDate: boolean
  shouldDisplayTime: boolean
  body: string
}

export interface GlobalsState {
  toggleTodoAddBox: boolean
}

export interface RootState {
  todosState: { [todos: string]: Todo }
  globalsState: GlobalsState
}