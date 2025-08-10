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
  })
})
