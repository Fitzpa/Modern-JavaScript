// Storage Controller

//* Item Controller
const ItemController = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const state = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1100 },
      // { id: 1, name: 'Cookie', calories: 500 },
      // { id: 2, name: 'Apple Sauce', calories: 200 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    getItems() {
      return state.items;
    },
    getItemById(id) {
      let itemFound = null;
      // Loop through array of items
      state.items.forEach((item) => {
        if (item.id === id) {
          itemFound = item;
        }
      });

      return itemFound;
    },
    getTotalCalories() {
      let total = 0;
      state.items.forEach((item) => {
        total += item.calories;
      });

      // Set total cal in state
      state.totalCalories = total;

      return state.totalCalories;
    },
    logState() {
      return state;
    },
    setCurrentItem(item) {
      state.currentItem = item;
    },
    getCurrentItem() {
      return state.currentItem;
    },
    addItem(name, calories) {
      let ID;
      const cal = +calories;
      // Create ID and increment it by 1 for each item
      if (state.items.length > 0) {
        ID = state.items[state.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item
      const newItem = new Item(ID, name, cal);

      // updating state with new item
      state.items.push(newItem);

      return newItem;
    },
  };
})();

//* UI Controller
const UIController = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  };
  // Public Methods
  return {
    populateItemList(items) {
      let html = '';

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors() {
      return UISelectors;
    },
    getItemInput() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // add id
      li.id = `item-${item.id}`;
      // add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    hideList() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState() {
      UIController.clearInputs();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },
    showEditState() {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
    },
    clearInputs() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemController.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
  };
})();

//* App Controller
const AppController = (function (ItemController, UIController) {
  // Add Item Submit
  const itemAddSubmit = function (e) {
    // Get for input from UI Controller
    const input = UIController.getItemInput();

    // Validation
    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add Item from Item Controller
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add new item to UI list
      UIController.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);

      // Clear fields
      UIController.clearInputs();
    }

    e.preventDefault();
  };

  // Upate item submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // split into an array so we can isolate the id;
      const listIdArr = listId.split('-');

      // get the actual id
      const id = +listIdArr[1];

      // Get item
      const itemToEdit = ItemController.getItemById(id);

      // Set current item
      ItemController.setCurrentItem(itemToEdit);

      // Add item to form
      UIController.addItemToForm();
    }
    e.preventDefault();
  };

  // Load Event Listeners
  const loadEventListeners = function () {
    // Get UI Selectors from the UIController
    const UISelectors = UIController.getSelectors();

    // Add Item Event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    // Edit icon event listener
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemUpdateSubmit);
  };

  // Public Methods
  return {
    init() {
      // set initial state
      UIController.clearEditState();

      // fetch items from ItemController state
      const items = ItemController.getItems();

      // Check if any items are present
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Load Event Listeners
      loadEventListeners();
    },
  };
})(ItemController, UIController);

// Initialize App
AppController.init();
