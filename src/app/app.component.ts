import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Die Komponente würde man CalculatorComponent nennen (und alle Dateien dazu entsprechend)
  // Außerdem solltest du unbedingt ne Validierung einführen, dass man keinen Quatsch (z.B. 1 + + 1) eingeben kann.
  // Interessant wäre es auch Mal eine andere Implementierung dagegenzuhalten, jetzt wo du fertig bist (z.B. https://www.tektutorialshub.com/angular/angular-calculator-application/ oder https://www.techiediaries.com/angular/angular-9-tutorial-and-example/ oder https://stackblitz.com/edit/ng-calculator oder https://stackblitz.com/edit/angular-basic-calculator?file=src%2Fapp%2Fapp.component.ts)


  // Properties immer möglichst selbstsprechend. Was ist z.B. a oder b? Musst auch nicht viel abkürzen dabei. Und immer kleingeschrieben und camelCase.
  title = 'Calculator';
  myName = 'Kristian';
  display = '';
  saveNum = '';
  cache2 = '';
  displaySmall = '';
  cacheArr: string[] = [];
  a = '';
  b = '';
  finalResult = 0;
  resultDis = '';

  // Der Name passt nicht gut. Besser du machst einzelne Methoden für die Operationen, z.B. add, multiply, ... Unter der Haube kannst du dann "chache" (oder besser "store") nutzen.
  // Außerdem ist das schwer zu testen mit Unit-Tests, weil die Methode so groß ist und so viele Möglichkeiten hat, durchlaufen zu werden (zyklomatische Komplexität).

  input(input: any): void {

    let Add: string[] = [];
    let Sub: string[] = [];
    let Mul: string[] = [];
    let Div: string[] = [];

    if (input !== '-' && input !== '+' && input !== '/' && input !== '*') {
      this.saveNum = this.saveNum + input;
      this.display = this.saveNum;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.resultDis === '') {
      this.cacheArr = this.cacheArr.concat('0');
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = input;
      this.displaySmall = this.cache2;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum !== '' && this.resultDis === '') {
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.saveNum = '';
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum === '') {
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.resultDis + input;
      this.displaySmall = this.cache2;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum !== '' && (this.cacheArr.slice(-1) === Sub || this.cacheArr.slice(-1) === Add || this.cacheArr.slice(-1) === Div || this.cacheArr.slice(-1) === Mul)) {
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2;
      this.saveNum = '';
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum !== '' && (this.cacheArr.slice(-1) !== Sub || this.cacheArr.slice(-1) !== Add || this.cacheArr.slice(-1) !== Div || this.cacheArr.slice(-1) !== Mul)) {
      this.cacheArr = [];
      this.resultDis = '';
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2;
      this.saveNum = '';
    }
  }

  // Der Name passt auch nicht gut. Eigentlich machst du hier zwei Dinge: store und calculate

  result(): void {
    this.cacheArr = this.cacheArr.concat(this.saveNum);
    this.cache2 = this.cache2 + this.saveNum;
    this.saveNum = '';
    this.displaySmall = this.cache2;
    this.CalcMulDiv();
    this.CalcAddSub();
  }
  CalcMulDiv(): void {
    if (this.cacheArr.length >= 3) {
      for (var i = 0; i < this.cacheArr.length; i++) {
        if (this.cacheArr[i] === '/') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.div('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.CalcMulDiv();
        }
        else if (this.cacheArr[i] === '*') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.mul('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.CalcMulDiv();
        }
      }
    }
  }

  CalcAddSub(): void {
    if (this.cacheArr.length >= 3) {
      for (var i = 0; i < this.cacheArr.length; i++) {
        if (this.cacheArr[i] === '+') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.add('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.CalcAddSub();
        }
        else if (this.cacheArr[i] === '-') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.sub('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.CalcAddSub();
        }
      }
    }
    this.resultDis = this.cacheArr.join('');
    this.display = this.resultDis;
  }
  /* Nicht mit Globalen Variablen arbeiten */
  //Wegen Rundung schauen 0,1 + 0,2
  mul(multsymbol: any) {

    this.finalResult = parseFloat(this.a) * parseFloat(this.b);
    return this.finalResult;
  }
  add(addsymbol: any) {

    this.finalResult = parseFloat(this.a) + parseFloat(this.b);
    return this.finalResult;
  }
  sub(subtsymbol: any) {

    this.finalResult = parseFloat(this.a) - parseFloat(this.b);
    return this.finalResult;
  }
  div(divsymbol: any) {

    this.finalResult = parseFloat(this.a) / parseFloat(this.b);
    return this.finalResult;
  }

  clear(): void {
    this.saveNum = '';
    this.display = '';
    this.displaySmall = '';
    this.cache2 = '';
    this.cacheArr = [];
    this.resultDis = '';
  }

  delete(): void {
    this.saveNum = this.saveNum.slice(0, -1);
    this.display = this.saveNum;
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
