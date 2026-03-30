const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Appointment = sequelize.define("Appointment", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  
  appointmentTime: {
    type: DataTypes.DATE,
    allowNull: false
  },

  
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  },

  
  status: {
    type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
    defaultValue: "scheduled"
  },
  doctorApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,   // false = pending, true = approved
    allowNull: false
  },

}, {
  timestamps: true
});

module.exports = Appointment;