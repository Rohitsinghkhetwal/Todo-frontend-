import { useContext, createContext } from "react";



interface authProps {
    onCreate: (todos: string) => Promise<any>,
    onDelete: (id: any) => Promise<any>,
    onUpdate: (id: any) => Promise<any>,
    Getall: () => Promise<any>,
    
}

const AuthContext = createContext<Partial<authProps>>({});
const URL = "http://localhost:5000";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children}: any) => {

    const CreateTodos = async(todos: string) => {
        try{
            const result = await fetch(`${URL}/createTodo`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({todo:todos})
            });
            const convertIt = await result.json();
            return convertIt;

        }catch(err){
            return {
                err, 
                message: "something went wrong !"
            }
            
        }
    }

    const GetAllTodo = async() => {
        try{
            const result = await fetch(`${URL}/getAll`, {
                method: 'GET',
                headers:{
                    'Content-Type': "application/josn"
                }
            });
            const app = await result.json();
            console.log("All data is here !", app);
            return app;

        }catch(err){
            return {
                err: true,
                message: "Something went wrong in server side !"
            }

        }

    }

    const DeleteTodos = async(id: any) => {
        try {
            let result = await fetch(`${URL}/deleteTodo/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await result.json();
            console.log("deleted successfully __", data);
            return result;

        }catch(err){
            return {
                err: true,
                message: "item not deleted ! "
            }

        }
    }
   

    const items = {
        onCreate: CreateTodos,
        onDelete: DeleteTodos,
        // onUpdate: UpdateTodos,
        Getall: GetAllTodo,
    }
    return <AuthContext.Provider value={items}>{children}</AuthContext.Provider>

}

