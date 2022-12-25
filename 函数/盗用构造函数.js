function Teacher(nickname, age, height) {
  this.nickname = nickname;
  this.age = age;
  this.height = height;
}

function Student(nickname, age, height) {
  Teacher.call(this, nickname, age, height);
  this.hobby = ["唱", "跳", "rap"];
}

Teacher.prototype.running = function () {
  console.log("老师");
};

Teacher.prototype.teach = function () {
  console.log("教");
};

const student = new Student("moment", "18", "1米59");

console.log(student.height); // 1米59
console.log(student.hobby); //  ["唱", "跳", "rap"]
