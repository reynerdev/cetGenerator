import { constants } from './Constants';

const returnLetter = (colNumber) => {
  const transformObject = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
  };

  return transformObject[colNumber];
};

const infoRowSensor = {
  'Gas Indicado': 13,
  Referencia: 14,
  'Numero de Serie': 15,
  'Rango de Medida': 16,
  'Ultima calibracion': 17,
  'Gas de calibracion': 18,
  'Concentracion gas de calibracion': 19,
  'Nivel alarma A1': 20,
  'Nivel alarma A2': 21,
  'Evaluacion Modo Higiene': 22,
  'Duracion valor principal': 23,
  'VLA-EC (STEL)': 24,
  'VLA-EC (TWA)': 25,
  'Duracion de exposicion': 26,
};

function sensorData() {
  this.A13 = {
    row: 13,
    name: 'GasIndicado',
    value: null,
  };
  this.A14 = {
    row: 14,
    name: 'Referencia',
    value: null,
  };
  this.A15 = {
    row: 15,
    name: 'Numero de serie',
    value: null,
  };
  this.A16 = {
    row: 16,
    name: 'Rango de medida',
    value: null,
  };
  this.A17 = {
    row: 17,
    name: 'Ultima Calibracion',
    value: null,
  };
  this.A18 = {
    row: 18,
    name: 'Gas de calibracion',
    value: null,
  };
  this.A19 = {
    row: 19,
    name: 'Concentracion de gas de calibracion',
    value: null,
  };
  this.A20 = {
    row: 20,
    name: 'Nivel de alarma A1',
    value: null,
  };
  this.A21 = {
    row: 21,
    name: 'Nivel de alarma A2',
    value: null,
  };
  this.A22 = {
    row: 22,
    name: 'Nivel de alarma A2',
    value: null,
  };
  this.A23 = {
    row: 23,
    name: 'Evaluacion Modo Higiene',
    value: null,
  };
  this.A24 = {
    row: 24,
    name: 'VLA-EC (STEL)',
    value: null,
  };
  this.A25 = {
    row: 25,
    name: 'VLA-EC (TWA)',
    value: null,
  };
  this.A26 = {
    row: 26,
    name: 'Duracion de exposicion',
    value: null,
  };
  this.getRow = function (cell) {
    return this[cell].row;
  };
  this.getCellName = function (cell) {
    return this[cell].name;
  };
  this.getValue = function (cell) {
    return this[cell].value;
  };
  this.setValue = function (value, cell) {
    console.log('setValue', cell, this);
    let celda = cell.toString();
    this[cell].value = value;
  };
}

const getDataWorksheet = (sheet) => {
  // create a base data object

  const data = {};

  // 1. Count the number of sensor installed

  let numberSensorInstalled = 0;

  const listOfColumns = [];

  const row = sheet.getRow(constants.GASTYPE_ROW);

  console.log('row', row);

  const sensorDAtaaaa = new sensorData();

  console.log('dataaaaaaaaaa', sensorDAtaaaa);

  const reee = 'test';

  const sensors = [];

  // were going to loop with the non empty sensor columns. After, with that columns we will find the details of the sensor
  row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    console.log(
      'the value of the cell is',
      cell,
      cell.result,
      cell.address,
      cell.col
    );

    // we create an object that will handle our data recollected from the file
    let sd = new sensorData();

    // check wether there is a sensor installad on the device

    if (!!cell.result) {
      console.log('not empty cell', cell.col);

      for (let key in sd) {
        // to check whether the key belongs to sd
        if (!sd.hasOwnProperty(key)) {
          continue;
        }

        // only non function properties
        if (typeof sd[key] !== 'function') {
          const celda = returnLetter(cell.col) + sd[key].row;
          console.log('celda', celda, 'sd', sd);
          // console.log('celda name', sd[celda].name);
          console.log(!!sd[key].name);
          console.log('key', key);

          // set the value of the sd object with the values of the excel file
          sd.setValue(sheet.getCell(celda).result, 'A' + sd[key].row);
          // if (!!!cell.name) {
          //   sd.setValue(cell.value, celda);
          // }
        }
      }
    }

    console.log('SensorFinal', sd);
    sensors.push(sd);
  });

  console.log('sensors', sensors);

  return sensors;

  const sensorTemplate = {
    sensorType: '',
    sensorChannel: '',
    sensorGas: '',
    sensorPartNumber: '',
    sensorSerialNumber: '',
    sensorRange: '',
    sensorLastCalibration: '',
  };
};

export { getDataWorksheet };
