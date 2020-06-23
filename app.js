// Storage Controller

// Item Controller
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
      { id: 0, name: 'Steak Dinner', calories: 1100 },
      { id: 1, name: 'Cookie', calories: 500 },
      { id: 2, name: 'Apple Sauce', calories: 200 },
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
  };
})();

// UI Controller
const UIController = (function () {
  const UISelectors = {
    itemList: '#item-list',
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
  };
})();

// App Controller
const AppController = (function (ItemController, UIController) {
  // Public Methods
  return {
    init() {
      console.log('Initializing App...');
      // fetch items from ItemController state
      const items = ItemController.getItems();

      // Populate list with items
      UIController.populateItemList(items);
    },
  };
})(ItemController, UIController);

// Initialize App
AppController.init();
