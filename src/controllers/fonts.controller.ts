import { Op } from 'sequelize';
import sequelize from 'sequelize';
import opentype from 'opentype.js';
import { Request, Response, NextFunction } from 'express';

import { Font } from '../model/fonts.model';
import { success } from '../helpers/success';
import { sequelize as sql } from '../config/db';
import { NOT_FOUND, ERROR } from '../helpers/error';

const APIError = require('../helpers/APIError.js');
const size = {
  preview: {
    x: 10,
    y: 100,
    size: 50,
  },
  glyph: {
    x: 30,
    y: 50,
    size: 50,
  },
};

const starCount = [
  'oneStarCount',
  'twoStarCount',
  'threeStarCount',
  'fourStarCount',
  'fiveStarCount',
];

export const getFonstList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fontsList = await Font.findAll();
    return res.json(success(fontsList));
  } catch (err) {
    return next(err);
  }
};

export const getFontById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const searchId = req.params.id;
  try {
    const resultFont = await Font.findOne({
      where: {
        id: searchId,
      },
    });

    if (!resultFont) {
      throw NOT_FOUND('Font not found');
    }

    return res.json(success(resultFont));
  } catch (err) {
    return next(err);
  }
};

export const previewFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const inputText = req.body.text;
  const output = req.body.filter;

  try {
    const font = opentype.loadSync(`fonts/${output}`);
    const result = font.getPath(
      inputText,
      size.preview.x,
      size.preview.y,
      size.preview.size,
    );
    const points = result.toPathData(0);

    return res.json(success(points));
  } catch (err) {
    return next(err);
  }
};

export const rateOnFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { newRating, oldRating, total, fontId } = req.body;

  const rateField = starCount[newRating - 1];
  const updatedRating = (oldRating * total + newRating) / (total + 1);

  try {
    const ratedFont = await Font.update(
      {
        rating: updatedRating,
        [rateField]: sequelize.literal(`${rateField} + 1`),
      },
      {
        where: {
          id: fontId,
        },
      },
    );
    if (ratedFont[0] === 0) {
      throw NOT_FOUND('Not Found !');
    }

    return res.json(success());
  } catch (err) {
    return next(err);
  }
};

export const addFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newFont = await Font.create({
      ...req.body,
    });
    await newFont.save();
    return res.json(success(newFont));
  } catch (err) {
    return next(err);
  }
};

export const uploadFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.files) {
      throw ERROR('File not uploaded!');
    }

    let uploadedFont: any = req.files.font;
    const fileName: string = uploadedFont.name;
    uploadedFont.mv(`./fonts/${fileName}`);

    return res.json(success({ fileName }));
  } catch (err) {
    return next(err);
  }
};

export const deleteFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const delFont = await Font.destroy({
      where: {
        id,
      },
    });

    sql.query(`ALTER TABLE fonts AUTO_INCREMENT = ${id};`);

    if (!delFont) {
      throw NOT_FOUND('Not found !');
    }
    return res.json(success(delFont));
  } catch (err) {
    return next(err);
  }
};

export const searchFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { searchFont } = req.params;
  const searchName = searchFont.toLowerCase();
  try {
    const search = await Font.findAll({
      where: {
        searchName: {
          [Op.like]: `%${searchName}%`,
        },
      },
    });

    if (!search) {
      throw NOT_FOUND('Not found !');
    }
    return res.json(success(search));
  } catch (err) {
    return next(err);
  }
};

export const updateFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const updatedFont = await Font.update(req.body, { where: { id: id } });
    if (!updatedFont) {
      throw NOT_FOUND('Not found !');
    }
    return res.json(success(updatedFont));
  } catch (err) {
    return next(err);
  }
};

export const downloadFont = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const font = await Font.findByPk(id);
    if (!font?.getDataValue('id')) {
      throw NOT_FOUND('Not found !');
    }
    await Font.increment({ downloads: 1 }, { where: { id: id } });
    const searchName: string = font.getDataValue('searchName');
    const path = `fonts/${searchName}.ttf`;
    return res.download(path);
  } catch (err) {
    return next(err);
  }
};

export const getGlyphs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { searchName } = req.params;
  try {
    const font = opentype.loadSync(`fonts/${searchName}`);
    const length = font.numGlyphs;
    let glyphsPoints = [];

    for (let i = 0; i < length; i++) {
      const glyph = font.glyphs.get(i);
      const path = glyph
        .getPath(size.glyph.x, size.glyph.y, size.glyph.size)
        .toPathData(0);
      glyphsPoints.push(path);
    }

    return res.json(success(glyphsPoints));
  } catch (err) {
    return next(err);
  }
};
