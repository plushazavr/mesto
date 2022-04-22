export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data; // Массив данных, которые нужно добавить на страницу
    this._renderer = renderer; // Функция отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // селектор контейнера, куда добавлять элементы
  }

  // Отвечает за отрисовку всех элементов
  renderItems() {
    // Пробегаемся по элементам массива
    this._renderedItems.forEach(item => {
        // Отрисовываем с помощью renderer
        this._renderer(item);
    });
  }

  // Принимает DOM-элемент и добавляет его в контейнер (_container)
  addItem(element) {
    this._container.prepend(element);
  }
}