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
    bad_array.push({foo: "bar", bar: "foo"});
    bad_array.push({bad: "object", error: true});
    assert.throws(() => new Table(bad_array));
  });
  it("same thing with Table.prototype.addEntry()", () => {
    const normal_table = new Table();
    normal_table.addEntry({foo: "bar", bar: "baz"});
    assert.throws(() => {
      normal_table.addEntry({error: true, bad: true});
    })
  });
  it("can use Table.prototype.addEntries to insert an array of objects", () => {
    const valid_entries = [
      {foo: "bar", bar: "baz"},
      {foo: "fighter", bar: "lead bar"}
    ];
    const the_table = new Table();
    assert.doesNotThrow(() => {
      the_table.addEntries(valid_entries);
      assert.strictEqual(the_table.toString(), 'foo|bar\nbar|baz\nfighter|lead bar');
    })
  });
  it("can be turned into an HTML <table> object", () => {
    const t = new Table();
    t.addEntry({foo: "bar", bar: "baz"});
    const html = t.toHtmlTableString();
    assert.strictEqual(html, '<table><tr><th>foo</th><th>bar</th></tr><tr><td>bar</td><td>baz</td></tr></table>');
  });
  it("can be emptied", () => {
    const t = new Table();
    t.addEntry({foo: "bar", bar: "baz"});
    t.empty();
    assert.strictEqual(t.toString(), "\n");
  });
  it("can be copied", () => {
    const t1 = new Table();
    t1.addEntry({foo: "bar", bar: "baz"});
    const t2 = new Table();
    Table.copy(t1, t2);
    assert.strictEqual(t2.toString(), "foo|bar\nbar|baz")
  })
})
