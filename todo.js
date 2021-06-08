import readlineSync from "readline-sync";

const options = ["add", "list", "remove", "pomodoro"];
let todos = [];
let isActive = true;

let action = readlineSync.keyInSelect(options, "Type your command");

while (isActive === true) {
  if (action === 0) {
    const newTodoText = readlineSync.question("What do you want to do? ");
    const newTodo = {
      text: newTodoText,
      done: false,
      pomodoro: false,
    };
    todos.push(newTodo);
    action = readlineSync.keyInSelect(options, "Type your command");
  } else if (action === 1) {
    if (todos.length > 0) {
      let todosTexts = [];
      for (let i = 0; i < todos.length; i++) {
        todosTexts.push(`${todos[i].done ? "🟢" : "🔴"} ` + todos[i].text);
      }
      let toggle = readlineSync.keyInSelect(
        todosTexts,
        "What todo do you want to check/uncheck?"
      );
      if (toggle !== -1) {
        if (todos[toggle].done === false) {
          todos[toggle].done = true;
          action = 1;
        } else if (todos[toggle].done === true) {
          todos[toggle].done = false;
          action = 1;
        }
      } else {
        action = readlineSync.keyInSelect(options, "Type your command");
      }
    } else {
      console.log("You have not added a todo yet!");
      if (readlineSync.keyInYN("Do you want to continue?")) {
        action = readlineSync.keyInSelect(options, "Type your command");
      } else {
        isActive = false;
      }
    }
  } else if (action === 2) {
    if (todos.length > 0) {
      let todosTexts = [];
      for (let i = 0; i < todos.length; i++) {
        todosTexts.push(`${todos[i].done ? "🟢" : "🔴"} ` + todos[i].text);
      }
      let toggle = readlineSync.keyInSelect(
        todosTexts,
        "What todo do you want to remove?"
      );
      if (toggle !== -1) {
        todos = todos.splice(toggle, 1);
      } else {
        action = readlineSync.keyInSelect(options, "Type your command");
      }
    } else {
      console.log("You have not added a todo yet!");
      if (readlineSync.keyInYN("Do you want to continue?")) {
        action = readlineSync.keyInSelect(options, "Type your command");
      } else {
        isActive = false;
      }
    }
  } else if (action === 3) {
    if (todos.length > 0) {
      let todosTexts = [];
      for (let i = 0; i < todos.length; i++) {
        todosTexts.push(`${todos[i].done ? "🟢" : "🔴"} ` + todos[i].text);
      }
      let toggle = readlineSync.keyInSelect(
        todosTexts,
        "What todo do you want to have a pomodoro?"
      );
      if (toggle !== -1) {
        if (!todos[toggle].pomodoro) {
          todos[toggle].pomodoro = true;
          console.log(`Pomodoro de ${todos[toggle].text} ativo!`);
          todos[toggle].text += " 🍅";
          setTimeout(() => {
            todos[toggle].pomodoro = false;
          }, 1500000);
        } else {
          console.log("Pomodoro em andamento!");
        }
      } else {
        action = readlineSync.keyInSelect(options, "Type your command");
      }
    } else {
      console.log("You have not added a todo yet!");
      if (readlineSync.keyInYN("Do you want to continue?")) {
        action = readlineSync.keyInSelect(options, "Type your command");
      } else {
        isActive = false;
      }
    }
  } else if (action === -1) {
    isActive = false;
  }
}
