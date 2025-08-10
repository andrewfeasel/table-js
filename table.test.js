import { describe, it } from "node:test";
import assert from "node:assert";
import Table from "./table.js";

describe("table.js test suite", () => {
  it("creates a table from an object", () => {
    const foo = {
      bar: "baz",
      horse: "neigh"
    }
    const foo_table = new Table(foo, "|");
    assert.strictEqual(foo_table.toString(), "bar|horse\nbaz|neigh");
  });
  it("can also do this with JSON", () => {
    const json = '{"foo": "bar", "horse": "neigh"}';
    const json_table = Table.fromJSON(json, "|");
    assert.strictEqual(json_table.toString(), "foo|horse\nbar|neigh");
  });
  it("works with an array of objects", () => {
    const thingy = [
      {status: 1, name: "banana"},
      {status: 2, name: "orange"}
    ];
    const thingy_table = new Table(thingy, "|");
    assert.strictEqual(thingy_table.toString(), 'status|name\n1|banana\n2|orange');
  });
  it("when an array of objects is passed, the keys must be consistent", () => {
    const bad_array = [];
    bad_array.push({foo: "bar", bar: "foo"}); // good so far
    bad_array.push({bad: "object", error: true}); // bad
    assert.throws(() => new Table(bad_array));
  });
  it("same thing with Table.prototype.addEntry()", () => {
    const normal_table = new Table();
    normal_table.addEntry({foo: "bar", bar: "baz"}); // good so far
    assert.throws(() => {
      normal_table.addEntry({error: true, bad: true});
    })
  })
})
