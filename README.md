(EN/RUS)

✅ ToDo List (Vanilla JavaScript)
📖 Description

This is a simple ToDo List web application built with Vanilla JavaScript.
The project demonstrates basic concepts of working with the DOM, events, application state, and localStorage.

The app allows users to manage tasks and keeps data saved after page reload.

🚀 Features

  Add new tasks with a date

  Edit task text and deadline

  Mark tasks as completed

  Delete tasks

  Filter tasks:

  Show all

  Show active (not completed)

  Save tasks to localStorage

  Restore tasks after page reload

  Date picker using Flatpickr

🧠 How It Works

  All tasks are stored in a single array (tasks)

  The UI is fully rendered based on this array

  Any change updates the array → re-renders the UI → saves to localStorage

  DOM elements do not store data, they only display it

🛠 Technologies

  HTML

  CSS

  JavaScript (ES6)

  Flatpickr

  localStorage

🎯 Purpose

  This project was created for learning purposes to practice:

  DOM manipulation

  Event handling

  State management

  Persistent data storage

👤 Author

  Educational project for JavaScript practice in CyberBionic Systematics.



📖 Описание проекта

ToDo List — это учебное веб-приложение для управления списком задач, написанное на чистом JavaScript без использования фреймворков.

Проект демонстрирует работу с:

-DOM

-событиями

-состоянием приложения (state)

-localStorage

-динамической отрисовкой интерфейса

Приложение позволяет добавлять, редактировать, удалять и фильтровать задачи, а также сохранять их между перезагрузками страницы.

🚀 Функциональность

➕ Добавление новой задачи с датой

✏️ Редактирование текста и даты задачи

✅ Отметка задачи как выполненной

🗑 Удаление задачи

🔍 Фильтрация задач:

показать все

показать только невыполненные

💾 Автоматическое сохранение задач в localStorage

🔄 Восстановление задач при перезагрузке страницы

📅 Выбор даты с помощью Flatpickr

🧠 Архитектура приложения

Приложение построено по принципу одного источника истины.

State (состояние приложения)
   let tasks = [];


Массив tasks — это центральное хранилище данных приложения.
Каждая задача представлена объектом:

 {
   id: Number,
   text: String,
   date: String,
   completed: Boolean
 }

🔁 Принцип работы

Любое действие пользователя (добавление, удаление, редактирование, чекбокс)

→ изменяет массив tasks

→ вызывается renderTasks(tasks)

→ данные сохраняются в localStorage

DOM не хранит данные, он только отображает текущее состояние.

🧩 Основные функции
   renderTasks(list)

Главная функция отрисовки интерфейса.
Полностью пересобирает список задач на основе переданного массива.

   createTask(task)

Создаёт DOM-элемент одной задачи и возвращает необходимые элементы для дальнейшей работы (чекбокс, кнопки).

  addTaskHandler()

Добавляет новую задачу в массив tasks, перерисовывает список и сохраняет данные.

  editTaskText(taskId)

Переводит задачу в режим редактирования, позволяет изменить текст и дату, затем обновляет состояние.

  removeTask(taskId)

Удаляет задачу из массива tasks и обновляет интерфейс.

  toggleTaskCompleted(taskId)

Меняет статус выполнения задачи (completed: true / false).

  saveTasks() / loadTasks()

Работа с localStorage: сохранение и восстановление состояния приложения.

🛠 Используемые технологии
 
 HTML5

 CSS3

 JavaScript (ES6)

 Flatpickr

 localStorage

🎯 Цель проекта

  Проект создан в учебных целях для:

  практики работы с DOM

  понимания архитектуры небольших приложений

  изучения взаимодействия состояния и интерфейса

  закрепления навыков чистого JavaScript

📌 Возможные улучшения

 Добавить фильтр "Выполненные"

 Добавить сортировку по дате

 Добавить drag & drop

 Переписать проект с использованием классов или фреймворка

🧡 Автор

  Проект выполнен в рамках обучения JavaScript в школе CyberBionic Systematics.
