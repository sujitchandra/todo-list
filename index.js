// using complex Dom manipulation..
// let index = 3;  
// function addTodo() {
//     const parentel = document.getElementById("todos");
//     const inputEl = document.getElementById("inp");
//     let todotext = inputEl.value.trim();

//     if (todotext === "") {
//         alert("Please add your todo list");
//         return; 
//     }

//     const textNode = document.createElement("div");
//     textNode.setAttribute("id", 'todo-' + index);
//     textNode.className = "todo-item"; 

//     const spanel = document.createElement("h4"); 
//     spanel.textContent = index + ". " + todotext;

//     const buttonel = document.createElement("button");
//     buttonel.textContent = "Delete";
//     buttonel.className = "delete-btn"; 
//     buttonel.setAttribute("onclick", "deleteTodo(" + index + ")");

//     textNode.appendChild(spanel);
//     textNode.appendChild(buttonel);
//     parentel.appendChild(textNode);
    
//     inputEl.value = "";  // Clear the input field after adding
//     index++;
// }

// function deleteTodo(index) {
//     const element = document.getElementById("todo-" + index);
//     if (element) {
//         element.parentNode.removeChild(element);
//     }
// }

// with the help of reconsiler like using state and components..
class TodoApp {
    constructor() {
        this.todos = [
            { id: 1, text: "Take class" },
            { id: 2, text: "Go out to eat" }
        ];
        this.index = this.todos.length + 1;
        this.render();
    }

    addTodo() {
        const inputEl = document.getElementById("inp");
        let todotext = inputEl.value.trim();

        if (todotext === "") {
            alert("Please add your todo list");
            return; 
        }

        this.todos.push({ id: this.index, text: todotext });
        this.index++;
        inputEl.value = "";  // Clear the input field
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.reindexTodos();
        this.render();
    }

    reindexTodos() {
        this.todos = this.todos.map((todo, idx) => ({
            id: idx + 1,
            text: todo.text
        }));
        this.index = this.todos.length + 1;
    }

    render() {
        const parentEl = document.getElementById("todos");
        parentEl.innerHTML = "";  // Clear current list

        this.todos.forEach(todo => {
            const textNode = document.createElement("div");
            textNode.setAttribute("id", 'todo-' + todo.id);
            textNode.className = "todo-item";

            const spanel = document.createElement("h4");
            spanel.textContent = todo.id + ". " + todo.text;

            const buttonEl = document.createElement("button");
            buttonEl.textContent = "Delete";
            buttonEl.className = "delete-btn";
            buttonEl.onclick = () => this.deleteTodo(todo.id);

            textNode.appendChild(spanel);
            textNode.appendChild(buttonEl);
            parentEl.appendChild(textNode);
        });
    }
}

// Initialize the app
const app = new TodoApp();

// Bind addTodo to the button
document.querySelector('.add-btn').onclick = () => app.addTodo();
