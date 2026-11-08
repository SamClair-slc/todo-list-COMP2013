import { useState, type ChangeEvent, type SubmitEvent} from "react";
import FormComponent from "./FormComponent";
import TodoContainer from "./TodoContainer";

export interface TodoCardProps {
    id: string;
    title: string;
    checked: boolean;
}

export interface TodoCardFunctions extends TodoCardProps {
    handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleEditTodo: (id:string) => void;
}

export interface TodoContainerProps {
    todoList: TodoCardProps[];
    handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleEditTodo: (id:string) => void;
}

export interface FormComponentProps extends TodoCardProps {
    handleFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function TodoApp() {
    //States
    //A state to store the input change
    //once the submit button is click, the state will be stored 
    //as a todo entry in another state that will save a list of todo
    const [todo, setTodo] = useState<TodoCardProps>({
        id:"",
        title:"",
        checked:false,
    });

    //Second state: a state to store all the todo entries in one array
    const [todoList, setTodoList] = useState<TodoCardProps[]>([]);

    //Handlers
    //1. Handle the form input change that will allow typing in the input
    const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo((prevTodo) => ({...prevTodo, [e.target.name]: e.target.value}));
    };
    //2. Handle the onSubmit event form to add the input to the todo list
    const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault() //to prevent the default refresh action from submitting the form
        if(todo.id === ""){
            setTodoList((prevList) => [
                ...prevList, 
                {
                id: crypto.randomUUID(),
                title: todo.title,
                checked: false,
                },
            ]);
        }
        else{
            setTodoList((prevList) => 
                prevList.map((entry) => 
                    entry.id === todo.id //If the entry id matches the id of the todo we're editing
                        ?{...entry, title: todo.title} //change its title to the edited one
                        :{...entry} // Else, leave it as is
                )
            );
        }
        
    
    setTodo({
        id:"",
        title:"",
        checked:false,
    })
    };
    //3. Handle the checkbox toggle in the todo list
    const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        setTodoList((prevList) => 
            prevList.map((entry) => 
                entry.id === id 
                    ? {...entry, checked: e.target.checked}
                    :{...entry},
            ),
        );
    };

    //4. Handle deleting an entry by using the delete button

    const handleDeleteTodo = (id: string) => {
        setTodoList((prevList) => prevList.filter((entry) => entry.id !== id));
    }

    //5. Handle editing an entry to change the title

    const handleEditTodo = (id: string) => {
        const todoEntry = todoList.find((entry) => entry.id === id) || {
            title: "", 
            id: "", 
            checked: false,
        };
        setTodo({...todoEntry})
    }

    //Main Return
    return (
        <div>
            <h1>Todo List App</h1>
            <FormComponent 
            {...todo} 
            handleFormOnChange={handleFormOnChange} 
            handleOnSubmit={handleOnSubmit}
            />
            <TodoContainer 
            todoList={todoList} 
            handleTodoCheck={handleTodoCheck} 
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
            />
        </div>
    )
}