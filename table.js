function consistentKeyCheck(obj_list) {
  const firstKeys = JSON.stringify(Object.keys(obj_list[0]));

  const consistency = obj_list
  .map(obj => JSON.stringify(Object.keys(obj)))
  .every(keys => keys === firstKeys);

  if(!consistency) { throw new Error("Inconsistently keyed object array was passed to Table constructor"); }
}

export default class Table {
  constructor(obj = {}, delimiter = "|") {
    this.delimiter = delimiter;
    if(Array.isArray(obj) && obj.length > 0) {
      consistentKeyCheck(obj);
      this.headers = Object.keys(obj[0]).join(this.delimiter);
      this.records = obj.map(row => Object.values(row).join(this.delimiter))
    } else if (!Array.isArray(obj)) {
      if(Object.keys(obj).length == 0) {
        this.headers = "";
        this.records = [];
      } else {
        this.headers = Object.keys(obj).join(this.delimiter);
        this.records = [Object.values(obj).join(this.delimiter)];
      }
    }
  }
  static fromJSON(json, delimiter) {
    return new Table(JSON.parse(json), delimiter);
  }
  addEntry(obj) {
    if(this.headers === "") {
      this.headers = Object.keys(obj).join(this.delimiter);
    } else if(Object.keys(obj).join(this.delimiter) !== this.headers) {
      throw new Error("Inconsistently keyed object array was passed to Table constructor");
    }
    this.records.push(Object.values(obj).join(this.delimiter));
  }
  addEntries(obj_list) {
    if(!Array.isArray(obj_list)) { throw new Error('Non-array object passed to Table.prototype.addEntries()'); }
    if(obj_list.length === 0) { throw new Error("Empty array passed to Table.prototype.addEntries()"); }

    for(let i = 0; i < obj_list.length; i++) {
      this.addEntry(obj_list[i]);
    }
  }
  toString(){
    return `${this.headers}\n${this.records.join("\n")}`;
  }
  print(){
    console.log(this.toString());
  }
  toHtmlTableString() {
    const rows = this.toString().split("\n");

    let th_list = rows.shift()
    .split(this.delimiter)
    .map(data => `<th>${data}</th>`)
    .join("");
    th_list = `<tr>${th_list}</tr>`;

    let record_list = [];
    for(let i = 0; i < rows.length; i++) {
      let current_record = rows[i]
      .split(this.delimiter)
      .map(data => `<td>${data}</td>`)
      .join("");
      current_record = `<tr>${current_record}</tr>`;
      record_list.push(current_record);
    }
    record_list = record_list.join("");
    return `<table>${th_list}${record_list}</table>`;
  }
}
