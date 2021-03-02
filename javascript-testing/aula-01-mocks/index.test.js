const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");
(async () => {
  {
    // const result = await File.csvToJson("./../mocks/threeItems-valid.csv");
    const result = File.csvToJson("./../mocks/emptyFile-invalid.csv");
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    await rejects(result, rejection);
  }
  {
    const result = File.csvToJson("./../mocks/fourItems-invalid.csv");
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    await rejects(result, rejection);
  }
  {
    const result = await File.csvToJson("./../mocks/threeItems-valid.csv");
    const expected = [
      {
        name: "Erick Wendel",
        id: 123,
        profession: "Javascript Instructor",
        birthDay: 1996,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "Javascript Especialist",
        birthDay: 1941,
      },
      {
        name: "Joao",
        id: 322,
        profession: "Java Developer",
        birthDay: 1941,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
