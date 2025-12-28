const calculadora = require("../models/calculadora.js");

test("somar 1 + 1 deve ser igual a 2", () => {
  expect(calculadora.soma(1, 1)).toBe(2);
});

test("somar string + 100 deve retornar Error", () => {
  expect(calculadora.soma("somar string", 100)).toBe("Error");
});
