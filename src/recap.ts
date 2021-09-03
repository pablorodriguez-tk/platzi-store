const myName = 'Nicolas';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};

class Persona {
  // Atributos del constructor
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  //Metodos
  getSummary() {
    return `my name is ${this.name}, ${this.age}`;
  }
}

const nicolas = new Persona(15, 'nicolas');

nicolas.getSummary();
