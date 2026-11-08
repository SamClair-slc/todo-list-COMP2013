//This component will contain 
//1. a body for the title of the todo message 
//2. a button for deleting this todo entry
//3. a button to edit this toddo entry
//4. a checkbook that will be used to check the item entry if completed.

import type { TodoCardFunctions } from "./TodoApp";


export default function TodoCard({
    id,
    checked, 
    title, 
    handleTodoCheck,
    handleDeleteTodo,
    handleEditTodo,
}: TodoCardFunctions){
    return (
        <div>
            <input 
                type="checkbox" 
                name="checked" 
                id="checked" 
                checked={checked} 
                onChange={(e) => handleTodoCheck(e, id)}
            />
            <span>{title}</span>
            <button onClick={() => handleDeleteTodo(id)}>Delete</button>
            <button onClick={() => handleEditTodo(id)}>Edit</button>
        </div>
    );
}