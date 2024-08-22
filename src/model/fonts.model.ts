import { DataTypes } from 'sequelize';

import { sequelize } from '../config/db';

export const Font = sequelize.define(
  'fonts',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    searchName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    downloads: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    thumbChars: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['free', 'premium'],
    },
    price: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'Other',
    },
    rating: {
      type: DataTypes.FLOAT(5, 1),
      defaultValue: 0,
    },
    oneStarCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    twoStarCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    threeStarCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fourStarCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fiveStarCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    initialAutoIncrement: '1',
  },
);
