//This component will have a Todo list as a prop
//Then we will map into several TodoCards

import type { TodoContainerProps } from "./TodoApp"
import TodoCard from "./TodoCard"

export default function TodoContainer({
    todoList, 
    handleTodoCheck,
    handleDeleteTodo,
    handleEditTodo,
}: TodoContainerProps) {
    return (
        <div>
            {todoList.length > 0 || "Todo List is Empty"}
            {todoList.map((todo) => 
            (<TodoCard 
                key={todo.id} 
                {...todo} 
                handleTodoCheck={handleTodoCheck} 
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}/>
        ))}
        </div>
    );
}

