function isConsistentObjectArray(obj_list) {
  const firstKeys = JSON.stringify(Object.keys(obj_list[0]));
  return obj_list
  .map(obj => JSON.stringify(Object.keys(obj)))
  .every(keys => keys === firstKeys)
}
export default class Table {
  constructor(obj = {}, delimiter = "|") {
    this.delimiter = delimiter;
    if(Array.isArray(obj) && obj.length > 0) {
      if(!isConsistentObjectArray(obj)) {
        throw new Error("Inconsistently keyed object array was passed to Table constructor");
      }
      this.headers = Object.keys(obj[0]).join(this.delimiter);
      this.records = obj.map(row => Object.values(row).join(this.delimiter))
    } else if (!Array.isArray(obj)) {
      if(Object.keys(obj).length < 0) {
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
  toString(){
    return `${this.headers}\n${this.records.join("\n")}`;
  }
  print(){
    console.log(this.toString());
  }
}
