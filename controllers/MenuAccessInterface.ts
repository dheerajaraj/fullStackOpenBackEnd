interface MenuAccessInterface {
  getDishById(id: number): MenuAccessInterface;
  addNewDish(dish: MenuAccessInterface);
}

module.exports = MenuAccessInterface;
