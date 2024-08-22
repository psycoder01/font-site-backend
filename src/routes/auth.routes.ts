import express from 'express';

import { verify } from '../controllers/verify.controller';

const router = express.Router();

router
  /**
   * @api {POST} 	/api/v1/auth/login                                                  Login
   * @apiName Login
   * @apiGroup Auth
   *
   * @apiParam (Request body parameters){String} { code }                             Login Code (Secret and should not be shared among bitch ass people).
   *
   * @apiSuccess {String} Token                                                       Access Token.
   *
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      generated token
   *    }
   */
  .post('/login', verify);

export = router;
