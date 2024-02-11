const { MarkovMachine } = require("./markov");
describe("markov testing", function () {
  test("make chains", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let dict = {
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null],
    };
    expect(mm.d).toEqual(dict);
  });
  test("make text", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText(10);
    expect(text).toEqual(expect.any(String));
  });
});
