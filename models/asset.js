const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  assetStatus: String,
  unitName: String,
  sapFaId: String,
  deviceType: String,
  department: String,
  userName: String,
  mailId: String,
  location: String,
  deviceMake: String,
  deviceModel: String,
  deviceSn: String,
  processor: String,
  ram: String,
  hdd: String,
  ssd: String,
  osNameVersion: String,
  poNo: String,
  poDate: String,
  amcWarranty: String,
  warrantyEndDate: String,
  remark: String,
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
