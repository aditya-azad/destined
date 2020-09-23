export interface Todo {
  body: string,
  date: string,
  time: string,
  repeat: string,
  color: string
}

export interface TodoWithIDPayload {
  todo: Todo,
  id: string
}

export interface TodoProps {
  shouldDisplayDate?: boolean
  shouldDisplayTime?: boolean
  todoAdder?: boolean
  id?: string
  todo?: Todo
}

export interface GlobalsState {
  toggleTodoAddBox: boolean
}

export interface RootState {
  todosState: { [todos: string]: Todo }
  globalsState: GlobalsState
}

export interface TodoStateInterface {
  [key: string]: Todo
}
