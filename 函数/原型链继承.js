function Student() {}
function Teacher() {}

Teacher.prototype.running = function () {
  console.log("老师");
};
Teacher.prototype.teach = function () {
  console.log("吃");
};

Student.prototype = Teacher.prototype;

const student = new Student();
student.running(); // 老师

student.__proto__.running = function () {
  console.log("我被修改了");
};

const teacher = new Teacher();
teacher.running(); // 我被修改了
