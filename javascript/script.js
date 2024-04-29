document.addEventListener("DOMContentLoaded", function() {
  const addItemBtn = document.getElementById("addItemBtn");
  const itemInput = document.getElementById("itemInput");
  const groceryList = document.getElementById("groceryList");
  const clearListBtn = document.getElementById("clearListBtn");

  // Load items from local storage
  const savedItems = JSON.parse(localStorage.getItem("groceryListItems")) || [];
  savedItems.forEach(item => addItem(item));

  addItemBtn.addEventListener("click", function() {
    const itemValue = itemInput.value.trim();
    if (itemValue !== "") {
      addItem(itemValue);
      itemInput.value = "";
    }
  });

  groceryList.addEventListener("click", function(event) {
    const listItem = event.target.closest("li");
    if (!listItem) return;

    if (event.target.classList.contains("delete-btn")) {
      listItem.remove();
      updateLocalStorage();
    } else if (event.target.classList.contains("edit-btn")) {
      const itemText = listItem.querySelector(".item-text");
      const newItemValue = prompt("Edit item:", itemText.textContent);
      if (newItemValue !== null) {
        itemText.textContent = newItemValue.trim();
        updateLocalStorage();
      }
    }
  });

  clearListBtn.addEventListener("click", function() {
    groceryList.innerHTML = "";
    updateLocalStorage();
  });

  function addItem(itemValue) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      <span class="item-text">${itemValue}</span>
      <div>
        <button class="btn btn-sm btn-info edit-btn mr-1">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </div>
    `;
    groceryList.appendChild(listItem);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const items = document.querySelectorAll("#groceryList .list-group-item");
    const itemList = [];
    items.forEach(item => itemList.push(item.querySelector(".item-text").textContent));
    localStorage.setItem("groceryListItems", JSON.stringify(itemList));
  }
});
