/* eslint-disable arrow-parens */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

const assert = require('assert');
const allSettled = require('promise.allsettled');

const getXats = async (LlistaAssignatures: Array<string>, grauID: string) => {
  try {
    let xatAssignatura: Array<IXatAssignatura> = [];
    let promises: Promise<unknown>[] = [];
    LlistaAssignatures.forEach(async (titol: any, index) => {
      promises.push(
        new Promise((resolve) => {
          XatAssignatura.findOne({ titol, grauID }).then((xatAssig) => {
            xatAssignatura.push(xatAssig);
            resolve(xatAssignatura);
          });
        })
      );
    });
    return allSettled(promises).then((xatAssig: any) => xatAssig[0].value);
  } catch (error) {
    return error;
  }
};

const getXatAssig: RequestHandler = async (req, res) => {
  const { grauID, LlistaAssignatures } = req.body;
  try {
    let xatAssignatura: Array<IXatAssignatura> = await getXats(LlistaAssignatures, grauID);
    // console.log(xatAssignatura.values);
    return res.send({ xatAssignatura });
  } catch (error) {
    return res.send({ message: 'XatAssignatura not found' });
  }
};

export default requestMiddleware(getXatAssig);
