// 실시간 시계
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// 로컬 스토리지를 사용한 로그인
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const welcomeMessage = document.getElementById("welcome-message");

function checkLogin() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        welcomeMessage.textContent = `Welcome, ${storedUsername}!`;
        loginForm.style.display = "none";
    } else {
        loginForm.style.display = "block";
    }
}

loginButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    checkLogin();
});

checkLogin();

// 로컬 스토리지를 사용한 투두리스트
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-button");
const todoList = document.getElementById("todo-list");

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}

function renderTodos() {
    const todos = getTodos();
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos(todos);
            renderTodos();
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

addTodoButton.addEventListener("click", () => {
    const todo = todoInput.value;
    if (todo) {
        const todos = getTodos();
        todos.push(todo);
        saveTodos(todos);
        renderTodos();
        todoInput.value = "";
    }
});

renderTodos();

// 랜덤 배경 이미지
const images = [
    "url('src/img1.jpg')",
    "url('src/img2.jpg')",
    "url('src/img3.jpg')",
    "url('src/img4.jpg')",
    "url('src/img5.jpg')",
    "url('src/img6.jpg')",
    "url('src/img7.jpg')",
    "url('src/img8.jpg')",
    "url('src/img9.jpg')",
    "url('src/img10.jpg')",
    "url('src/img11.jpg')",
    "url('src/img12.jpg')",
    "url('src/img13.jpg')"
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * images.length);
    document.body.style.backgroundImage = images[randomIndex];
}

setRandomBackground();

// 위치와 날씨
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "963ca91a8a399c240b3042bb26954302";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("Your current location is", lat, lng);
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find your current location.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);