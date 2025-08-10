export class Table {
  constructor(obj, delimiter) {
    this.delimiter = delimiter;
    if(Array.isArray(obj) && obj.length > 0) {
      this.headers = Object.keys(obj[0]).join(this.delimiter);
      this.records = obj.map(row => Object.values(row).join(this.delimiter))
    } else if (!Array.isArray(obj)) {
      this.headers = Object.keys(obj).join(this.delimiter);
      this.records = [Object.values(obj).join(this.delimiter)];
    } else {
      this.headers = "";
      this.records = []
    }
  }
  addEntry(obj) {
    this.records.push(Object.values(obj).join(this.delimiter));
  }
  print(){
    console.log(this.headers);
    console.log(this.records.join("\n"));
  }
}
