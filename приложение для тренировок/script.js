const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.workouts');
let items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAll = document.querySelector('.delete');

//Добавление нового профиля пользователя
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const dist = (this.querySelector('[name=item2]')).value;
  const hour = (this.querySelector('[name=item3]')).value;
  const item = {
    text,
    dist,
    hour,
    done: false
  };
  items.push(item);
  //Обновление локального хранилища
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);

  //Сброс вв значений
  this.reset();
}


//Создание нового элемента списка
function populateList(activities = [], activitiesList){
  activitiesList.innerHTML = activities.map((activity, i) => {
    let convertTime = +activity.hour+(+activity.minute/60);
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${activity.done ? "checked" : ""}></input>
        <label for="item${i}">${activity.text}</label>
        <label for="item${i}">${activity.dist} cm</label>
        <label for="item${i}">${activity.hour}kg</label> 
        <button class="erase">▼</button>
      </li>
    `
  }).join("");
}

//Mark a workout completed
function toggleDone(e){
  if(!e.target.matches('input')) return;
  const el = e.target;
  const ind = el.dataset.index;
  items[ind].done = !items[ind].done;
  
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

//Removing the workout from the list
function removeItem(e){
  if(!e.target.matches('button')) return;//checking if it is a delete button

  li = e.target.parentElement;
  let index = Array.prototype.indexOf.call(itemsList.children, li);

  itemsList.removeChild(li);

  removeLocalStorage(index);
}


//Updating a local Storage
function removeLocalStorage(index){
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
};
  
//EventListeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', removeItem);
deleteAll.addEventListener('click', ()=> {
  window.localStorage.clear();
  populateList(items=[], itemsList);
});

populateList(items, itemsList);
