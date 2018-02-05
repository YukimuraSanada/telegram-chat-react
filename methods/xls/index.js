const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Users results sheet');


module.exports = () => {

  // ws.column(1).setWidth(30);


  let headerStyle = wb.createStyle({
    font: {
      bold: true,
      underline: true
    },
    alignment: {
      horizontal: 'center'
    }
  });

  ws.cell(1, 1).style(headerStyle);
  ws.cell(1, 2).style(headerStyle);
  ws.cell(1, 3).style(headerStyle);

  ws.cell(1, 1).string('Username');
  ws.cell(1, 2).string('Chat name');
  ws.cell(1, 3).string('Status');


  wb.write('Excel.xlsx');
  console.log('Successful write to .xls');

};
