import express from 'express';

import {
  addFont,
  searchFont,
  updateFont,
  getGlyphs,
  uploadFont,
  rateOnFont,
  deleteFont,
  getFontById,
  previewFont,
  getFonstList,
  downloadFont,
} from '../controllers/fonts.controller';

const router = express.Router();

router
  /**
   * @api {GET} 	/api/v1/font/id={fontId}                                          Get Font By Id
   * @apiName Get Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                              Access Token.
   *
   * @apiParam {String} fontId                                                      Id of the font.
   *
   * @apiSuccess {Object} Object                                                    Response Object.
   * @apiSuccess {Boolean} Object.success                                           True or False.
   * @apiSuccess {Object} Object.data                                               Detail information about the font.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data": {
   *          font details .....
   *       }
   *    }
   */
  .get('/id=:id', getFontById);

router
  /**
   * @api {POST} 	/api/v1/font/rate                                                   Rate Font
   * @apiName Rate Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam (Request body parameters) {String} fontId                              Id of the font.
   * @apiParam (Request body parameters) {String} newRating                           New Rating given by the user.
   * @apiParam (Request body parameters) {String} oldRating                           Old rating of the font.
   * @apiParam (Request body parameters) {String} total                               Total rating votes of the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *    }
   */
  .post('/rate', rateOnFont);

router
  /**
   * @api {POST} 	/api/v1/font/fontList                                               Get All Fonts
   * @apiName Get All Fonts
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  All the fonts with details.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : [
   *        {font 1 details...},
   *        {font 2 details...},
   *        {font 3 details...}
   *      ]
   *    }
   */
  .get('/fontsList', getFonstList);

router
  /**
   * @api {POST} 	/api/v1/font/download/{fontId}                                      Download Font
   * @apiName Download a font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam  {String} fontId                                                       Id of the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *    }
   */
  .get('/download/:id', downloadFont);

router
  /**
   * @api {GET} 	/api/v1/font/search={searchText}                                    Search Fonts
   * @apiName Search Fonts
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam {String} searchText                           Search fonts with given text.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  All the fonts with details.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : [
   *        {font 1 details...},
   *        {font 2 details...},
   *      ]
   *    }
   */
  .get('/search=:searchFont', searchFont);

router
  /**
   * @api {GET} 	/api/v1/font/glyphs/searchName={searchName}                         Get Glyphs
   * @apiName Get Glyphs
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam (Request body parameters){String} searchName                           Search Name of the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  Array of svg paths.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : [
   *        "svg path for glyph 1",
   *        "svg path for glyph 2",
   *        "svg path for glyph 3"
   *      ]
   *    }
   */
  .get('/gylphs/searchName=:searchName', getGlyphs);

router
  /**
   * @api {POST} 	/api/v1/font/preview                                                Preview Font
   * @apiName Preview Fonts
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam (Request body parameters){String} text                                 The text to be mapped .
   * @apiParam (Request body parameters){String} filter                               The searchName of the font that maps.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  SVG Path data.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : [
   *        svg path data
   *      ]
   *    }
   */
  .post('/preview', previewFont);

// ####################ADMIN ROUTES#####################

router
  /**
   * @api {POST} 	/api/v1/font/admin/addFont                                          Add Font
   * @apiName Add Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam (Request body parameters){String} name                                 The name of the font to be displayed in site.
   * @apiParam (Request body parameters){String} searchName                           The file name of the font file.
   * @apiParam (Request body parameters){String} description                          Description of the font.
   * @apiParam (Request body parameters){String} type                                 premium or free.
   * @apiParam (Request body parameters){String} price                                Price of the font.
   * @apiParam (Request body parameters){String} [thumbChars]                         Character which will be mapped into respective font and will be show as thumbnail in site.
   * @apiParam (Request body parameters){String} [language]                           Language used in the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  Added font details.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : {
   *        added font details .....
   *      }
   *    }
   */
  .post('/admin/addFont', addFont);

router
  /**
   * @api {POST} 	/api/v1/font/admin/uploadFont                                       Upload Font
   * @apiName Upload Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   * @apiHeader {Blob} font                                                           Font file in blob format( Content-Type : form-data ).
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *    }
   */
  .post('/admin/uploadFont', uploadFont);

router
  /**
   * @api {DELETE} 	/api/v1/font/admin/delFont/{fontId}                               Delete Font
   * @apiName Delete Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   * @apiParam {String} fontId                                                        Id of the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *    }
   */
  .delete('/admin/delFont/:id', deleteFont);

router
  /**
   * @api {POST} 	/api/v1/font/admin/updateFont/{fontId}                              Update Font
   * @apiName Update Font
   * @apiGroup Font
   *
   * @apiHeader {String} authorization                                                Access Token.
   *
   *
   * @apiParam {String} fontId                                                        Id of the font.
   *
   * @apiParam (Request body parameters){String} [ name ]                             The name of the font to be displayed in site.
   * @apiParam (Request body parameters){String} [ searchName ]                       The file name of the font file.
   * @apiParam (Request body parameters){String} [ description ]                      Description of the font.
   * @apiParam (Request body parameters){String} [ type ]                             premium or free.
   * @apiParam (Request body parameters){String} [ price ]                            Price of the font.
   * @apiParam (Request body parameters){String} [thumbChars]                         Character which will be mapped into respective font and will be show as thumbnail in site.
   * @apiParam (Request body parameters){String} [language]                           Language used in the font.
   *
   * @apiSuccess {Object} Object
   * @apiSuccess {Boolean} Object.success                                             True or False.
   * @apiSuccess {Array} Object.data                                                  Added font details.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data" : {
   *        updated font details .....
   *      }
   *    }
   */
  .post('/admin/updateFont/:id', updateFont);

export = router;
