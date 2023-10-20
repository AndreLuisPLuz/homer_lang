class Stack {
  constructor() {
    this.stack = [];
    this.top = null;
  }

  push(item) {
    this.stack.push(item);
    this.top = item;
  }

  pop() {
    if (this.top !== null) {
      this.stack.pop();
      this.top = this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    } else {
      throw new Error("Stack is empty");
    }
  }

  empty() {
    for (var i = 0; i < this.stack.length; i++) {
      this.pop();
    }
  }
}

function dooh (dataStack) {
  var arr = [];
  
  for (var i = 0; i < dataStack.stack.length+1; i++) {
    arr.push(dataStack.top);
    dataStack.pop();
  }
  
  var content = 'console.log("';
  for (var i = arr.length-1; i >= 0; i--) {
    content += String.fromCharCode(arr[i]);
  }
  content += '");\n';

  console.log(content);
  fs.writeFile('./main.js', content, { flag: 'a+' }, err => {});
}

function donuts (dataStack) {
  var arr = [];

  for (var i = 0; i <= dataStack.stack.length+1; i++) {
    arr.push(dataStack.top);
    dataStack.pop();
  }

  var content = "";
  for (var i = arr.length-1; i >= 0; i--) {
    content += String.fromCharCode(arr[i]);
    if (i > 0) {
      content += '+';
    }
  }

  console.log(content);
  fs.writeFile('./main.js', content, { flag: 'a+' }, err => {});
}

function set (dataStack) {
  var arr = [];
  
  for (var i = 0; i <= dataStack.stack.length; i++) {
    arr.push(dataStack.top);
    dataStack.pop();
  }

  if (arr[0] !== "125") {
    var content = "\nvar ";
  }
  else {
    var content = "";
  }
  
  for (var i = arr.length-1; i >= 0; i--) {
    if (arr[i] == "123") {
      content += " = ";
    }
    else if (arr[i] == "125") {
      content += ";\n";
    }
    else {
      content += String.fromCharCode(arr[i]);
    }
  }

  console.log(content);
  fs.writeFile('./main.js', content, { flag: 'a+' }, err => {});
}

function interpret(marker, commands, dataStack) {
  const fn = commands.get(marker);
  if (fn) {
    fn(dataStack);
  }
}

const fs = require('fs');

const commands = new Map();
commands.set("10", dooh);
// commands.set("20", duff);
commands.set("30", donuts);
commands.set("40", set);

if (process.argv.length !== 3) {
  throw new Error('Usage: node main.js <filename>');
}

const fileName = "./" + process.argv[2];
var dataStack = new Stack();
var commandStack = new Stack();

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    throw new Error('Error reading file: ' + err.message);
  }

  const lines = data.split('\n');

  for (const line of lines) {
    const symbols = line.split(' ');
    var marker = symbols[0];
    var argument = symbols[1];

    console.log("comando: " + marker);
    console.log("argumento: " + argument);
    
    if (argument == "10") {      
      interpret(commandStack.top, commands, dataStack);

      marker = null;
      dataStack.empty();
      commandStack.empty();
    }
    else if (commands.has(marker)) {
      commandStack.push(marker);
      dataStack.push(argument);
    }
    
    // if (line.startsWith('-')) {
    //   interpret_assignment(dataStack, commandStack, line);
    // } else if (line.startsWith('>')) {
    //   interpret_command(dataStack, commandStack, line);
    // }
  }
});
