const mongoose = require('mongoose');
const xlsx = require('xlsx');
const dotenv = require('dotenv');
const Asset = require('./models/asset');

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const filePath = './IT Asset -13062024 (003).xlsx';

const importExcelData = async () => {
  const workbook = xlsx.readFile(filePath);
  const sheetNames = workbook.SheetNames;

  for (const sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    for (const data of jsonData) {
      const asset = new Asset({
        assetStatus: data['Asset Status'],
        unitName: data['Unit Name'],
        sapFaId: data['SAP FA Id'],
        deviceType: data['Device Type'],
        department: data['Department'],
        userName: data['User Name'],
        mailId: data['Mail ID'],
        location: data['Location'],
        deviceMake: data['Device Make'],
        deviceModel: data['Device Model'],
        deviceSn: data['Device S/N'],
        processor: data['Processor'],
        ram: data['RAM'],
        hdd: data['HDD'],
        ssd: data['SSD'],
        osNameVersion: data['OS Name and Version'],
        poNo: data['PO No'],
        poDate: data['PO Date'],
        amcWarranty: data['AMC / Warranty'],
        warrantyEndDate: data['Warranty end date'],
        remark: data['Remark'],
      });

      await asset.save();
    }
  }

  console.log('Data imported successfully');
  mongoose.connection.close();
};

importExcelData();
