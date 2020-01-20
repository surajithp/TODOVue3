import todos from "../utils/todos";
import { FilterByEnum, Data, FilterBy } from "../pages/types/List";
import { reactive, onMounted, computed, toRefs } from "@vue/composition-api";
export const useTodos = () => {
  const todoState = reactive<Data>({
    todos: [],
    newTodo: "",
    filterBy: FilterByEnum.ALL
  });
  const getTodos = (): void => {
    setTimeout(() => {
      todoState.todos = [...todos];
    }, 1000);
  };
  const init = (): void => {
    getTodos();
  };
  init();

  const addTodo = (): void => {
    const newTodo = { name: todoState.newTodo, completed: false };
    todoState.todos = [...todoState.todos, newTodo];
    todoState.newTodo = "";
  };
  const deleteTodo = (index: number): void => {
    todoState.todos = todoState.todos.filter((todo, i) => i !== index);
  };
  const completeTodo = (index: number): void => {
    todoState.todos[index].completed = true;
  };
  const handleClickFilterBy = function(filterBy: FilterBy): void {
    todoState.filterBy = filterBy;
  };
  const filteredTodos = computed(() => {
    return todoState.todos.filter(todo => {
      if (todoState.filterBy === FilterByEnum.WORKING) {
        return !todo.completed;
      }
      if (todoState.filterBy === FilterByEnum.DONE) {
        return todo.completed;
      }
      return todo;
    });
  });
  const numOfTodos = computed(() => {
    return todoState.todos.filter(todo => !todo.completed).length;
  });
  return {
    ...toRefs(todoState),
    filteredTodos,
    numOfTodos,
    addTodo,
    handleClickFilterBy,
    completeTodo,
    deleteTodo
  };
};
