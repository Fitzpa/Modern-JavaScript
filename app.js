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
    logState() {
      return state;
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
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
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
    clearInputs() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
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

      // Clear fields
      UIController.clearInputs();
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
  };

  // Public Methods
  return {
    init() {
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
