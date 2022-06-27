const { employees, species, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((animal, i) => animal.id === ids[i]);
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const objAnimal = species.find((element) => element.name === animal);
  return objAnimal.residents.every((element) => element.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  return employees.reduce((acc, cv) => {
    if ((cv.firstName === employeeName) || (cv.lastName === employeeName)) {
      return cv;
    }
    return acc;
  }, {});
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countAnimals(animal) {
  // seu código aqui
  if (!animal) {
    return species.reduce((acc, currentValue) => {
      const { name } = currentValue;
      const numberOfAnimals = currentValue.residents.length;
      acc[name] = numberOfAnimals;
      return acc;
    }, {});
  }

  return species.find((anim) => anim.name === animal).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdult = prices.Adult * Adult;
  const totalChild = prices.Child * Child;
  const totalSenior = prices.Senior * Senior;

  return totalAdult + totalChild + totalSenior;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    const schedule = Object.keys(hours);
    return schedule.reduce((acc, cv) => {
      acc[cv] = `Open from ${hours[cv].open}am until ${hours[cv].close - 12}pm`;
      if (cv === 'Monday') { acc[cv] = 'CLOSED'; }
      return acc;
    }, {});
  }
  if (dayName === 'Monday') { return { [dayName]: 'CLOSED' }; }

  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employee = employees.find((value) => value.id === id);
  const animalId = employee.responsibleFor[0];
  const animal = species.find((value) => value.id === animalId);
  const resident = animal.residents;
  const older = resident.reduce((acc, cv) => {
    if (acc.age > cv.age) {
      return acc;
    }
    return cv;
  });

  return [older.name, older.sex, older.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const percent = 1 + percentage / 100;
  prices.Adult = Math.round((prices.Adult * percent) * 100) / 100;
  prices.Child = Math.round((prices.Child * percent) * 100) / 100;
  prices.Senior = Math.round((prices.Senior * percent) * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  const obj = {};
  const reducer = employees.reduce((acc, cv) => {
    const name = `${cv.firstName} ${cv.lastName}`;
    acc[name] = [];
    cv.responsibleFor.forEach((animalId) => {
      acc[name].push((species.find((specie) => animalId === specie.id).name));
    });

    if (cv.firstName === idOrName || cv.id === idOrName || cv.lastName === idOrName) {
      obj[name] = acc[name];
    }
    return acc;
  }, {});

  return (idOrName === undefined) ? reducer : obj;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
