const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/employees/all
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

/**
 * 
 * @route POST api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  const data = req.body;

  if (!data.firstName || !data.lastName || !data.address || !data.age) {
    return res.status(400).json({ data: "Все поля обязятельные" });
  }

  const employee = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      createdEmployee: {
        create: data,
      },
    },
  });

  res.status(201).json(employee);
};

/**
 * 
 * @route POST api/employees/remove
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch (err) {
    return res.status(400).json({ message: "Неудалось удалить сотрудника" });
  }
};

/**
 * 
 * @route PUT api/employees/edit
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "Неудалось редактировать сотрудника" });
  }
};

/**
 * 
 * @route GET api/employees/:id
 * @desc Полчуние сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch {
    res.status(400).json({ message: "Неудалось получить сотрудника" });
  }
};

module.exports = {
  add,
  remove,
  edit,
  all,
  employee,
};
