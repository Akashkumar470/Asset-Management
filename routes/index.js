const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const User = require('../models/user');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', isAuthenticated, async (req, res) => {
  const assets = await Asset.find();
  res.render('home', { assets });
});

router.get('/add-asset', (req, res) => {
  res.render('add-asset');
});


router.post('/add-asset', async (req, res) => {
  const assetData = {
    assetStatus: req.body.Asset_Status,
    unitName: req.body.Unit_Name,
    sapFaId: req.body.SAP_FA_Id,
    deviceType: req.body.Device_Type,
    department: req.body.Department,
    userName: req.body.User_Name,
    mailId: req.body.Mail_Id,
    location: req.body.Location,
    deviceMake: req.body.Device_Make,
    deviceModel: req.body.Device_Model,
    deviceSn: req.body.Device_SN,
    processor: req.body.Processor,
    ram: req.body.RAM,
    hdd: req.body.HDD,
    ssd: req.body.SDD,
    osNameVersion: req.body.OS_Name_and_Version,
    poNo: req.body.PO_No,
    poDate: req.body.PO_Date,
    amcWarranty: req.body.AMC_Warranty,
    warrantyEndDate: req.body.Warranty_end_date,
    remark: req.body.Remark,
  };

  const asset = new Asset(assetData);
  await asset.save();
  res.redirect('/home');
});

router.get('/edit-asset/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    res.render('edit-asset', { asset });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/edit-asset/:id', async (req, res) => {
  try {
    const assetData = {
      assetStatus: req.body.Asset_Status,
      unitName: req.body.Unit_Name,
      sapFaId: req.body.SAP_FA_Id,
      deviceType: req.body.Device_Type,
      department: req.body.Department,
      userName: req.body.User_Name,
      mailId: req.body.Mail_Id,
      location: req.body.Location,
      deviceMake: req.body.Device_Make,
      deviceModel: req.body.Device_Model,
      deviceSn: req.body.Device_SN,
      processor: req.body.Processor,
      ram: req.body.RAM,
      hdd: req.body.HDD,
      ssd: req.body.SDD,
      osNameVersion: req.body.OS_Name_and_Version,
      poNo: req.body.PO_No,
      poDate: req.body.PO_Date,
      amcWarranty: req.body.AMC_Warranty,
      warrantyEndDate: req.body.Warranty_end_date,
      remark: req.body.Remark,
    };

    await Asset.findByIdAndUpdate(req.params.id, assetData);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/delete-asset/:id', async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.redirect('/home'); // Redirect to homepage or a list page after deletion
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
