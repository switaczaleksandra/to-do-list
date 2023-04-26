{
    let tasks = [];
    let hideDoneTasks = false;
    // ta zmienna mówi o tym czy ukończone zadania powinny być ukryte czy nie, jest alse albo true

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    }; // tworzę nową tablicę tasks, w której są wszystkie taski przed elementem, który chcę usunąć i wszystkie po elemencie, który chcę usunąć

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    }; // tworzymy nową tablicę tasks, która składa się ze wszystkich elementów które były przed i po i z nowego elementu który jest taki sam jak element ...tasks[taskIndex] i  różni się tylko done 

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    }; // tworzę nową tablicę, która zawiera wszystkie elementy z tablicy, które były wcześniej i nowy element

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    }; // funkcja, która przełącza to czy zadania powinny być ukryte czy nie

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    }; // z jedej tablicy tworzymy inną tablicę, w której wszystkie zaania mają done: true czyli są zrobione. Jest to kopia task, ale później jest zmodyfikowane done. Z każdego taska robimy taska, który ma done:true.

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    }; // funkcja, która dodaje addEventListener do przycisków, które usuwają zadanie


    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }; // funkcja, która przypisuje addEventListenery, do tych przycisków, które oznaczają zadanie jako zrobione

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="
                tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-tasks
            ">
                <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                    ${task.done ? "✓" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                🗑
                </button>
            </li >
    `
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    }; // tworzymy funkcję o nazwie taskToHTML, która dostaje w parametrze task i zwraca HTMLA, który reprezentuje ten task. Mamy element tasksElement, który ma klasę js-tasks. Bierzemy tablicę task mapujemy na tablicę HTMLi używając funkcji task ToHTML i łączymy wszystko pustym łańcuchem znaków. Jeśli zadanie jest ukończone i jest zaznaczone hideDoneTasks to wtedy dodajemy do zadnia klasę tasks__item--hidden. Za pomocą CSS ukrywamy go.

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };


        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button 
            class="buttons__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
            Ukończ wszystkie
        </button>
    `;
    }; // funkcja renderuje dwa przyciski, które mają coś zmieniać w zadaniach - albo ukrywają ukończone zadania albo pokazują ukończone zadania albo oznaczają wszystkie jako zrobione. Jeśli nie ma żadnych zadań to do buttonsElement nie zostanie nic wpisane. Natomiast jeśli są zadania to wpiszemy string, w którym mamy dwa przyciski. Jeden ma klasę toggleHideDoneTasks i w zależności od hideDone Task na przycisku jest pokazane Pokaż ukończone lub Ukryj ukończone. Kolejny przycisk oznacza wszystkie jako ukończone. Jest wyłączony jeśli wszystkie zadania są zrobione - używamy metody every, jeżeli wszystkie są ukończone dodajemy atrybut disabled, a jeżeli nie to go nie dodajemy.

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    }; // funkcja przypina addEventListenery,które mają sie odpalić po kliknięciu w jeden i drugi przycisk, natomiast te przyciski mogą się pojawić, ale nie muszą (renderują ie one wtedy kiedy lista zadań nie jest pusta). Łapiemy przycisk js-markAllDone i jeśli on istnieje to dodajemy addEventListener.

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    }; // sprawdzamy czy input nie jest pusty. Jeśli nie jest pusty to dodaje nowe zadanie i resetuje, ustawiamy focus w inpucie niezależnie od wszystkiego (czyli jak nic nie wpiszemy i klikniemy Dodaj zadanie)


    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}

