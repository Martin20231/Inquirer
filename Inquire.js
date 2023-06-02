import inquirer from 'inquirer';
import chalk from 'chalk';
import os from 'os';
import { exec } from 'child_process';
import fs from 'fs';


const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Wie ist dein Name?'
  },
  {
    type: 'list',
    name: 'age',
    message: 'Wie alt bist du?',
    choices: ['Unter 18', '18-25', '26-35', '36-50', 'Über 50']
  },
  {
    type: 'confirm',
    name: 'hobby',
    message: 'Hast du ein Hobby?',
    default: false
  },
  {
    type: 'input',
    name: 'hobbyName',
    message: 'Welches Hobby hast du?',
    when: function(answers) {
      return answers.hobby;
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(chalk.bold('Vielen Dank für deine Antworten:'));
  console.log(chalk.red('Name:'), answers.name);
  console.log(chalk.yellow('Alter:'), answers.age);
  if (answers.hobby) {
    console.log(chalk.green('Hobby:'), answers.hobbyName);
  }

  const platform = os.platform();
  console.log(chalk.cyan('Betriebssystem:'), platform);

  if (platform === 'win32') {
    exec('dir', (error, stdout, stderr) => {
      if (error) {
        console.error(`Fehler bei der Ausführung des Befehls: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Befehlsfehler: ${stderr}`);
        return;
      }
      console.log(chalk.cyan('Liste der Dateien:'));
      console.log(stdout);
      createOutputFile(stdout);
    });
  } else {
    exec('ls -la', (error, stdout, stderr) => {
      if (error) {
        console.error(`Fehler bei der Ausführung des Befehls: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Befehlsfehler: ${stderr}`);
        return;
      }
      console.log(chalk.cyan('Liste der Dateien:'));
      console.log(stdout);
      createOutputFile(stdout);
    });
  }
});

function createOutputFile(data) {
  fs.writeFile('Hausaufgabe.txt', data, 'utf8', (error) => {
    if (error) {
      console.error(`Fehler beim Schreiben der Datei: ${error}`);
      return;
    }
    console.log(chalk.cyan('Die Ausgabe wurde in die Datei "Hausaufgabe.txt" geschrieben.'));
  });
}
