/* eslint-disable arrow-parens */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { RequestHandler } from 'express';
import { IAssignatura } from '../../models/Assignatura';
import requestMiddleware from '../../middleware/request-middleware';
import XatAssignatura, { IXatAssignatura } from '../../models/XatAssignatura';

// const assert = require('assert');
const allSettled = require('promise.allsettled');

interface Assignatura {
  grauID: string;
  nomComplet: string;
  nomSigles: string;
  quad: Number;
}

const getXats = async (LlistaAssignatures: Array<Assignatura>) => {
  try {
    let xatAssignatura: Array<IXatAssignatura> = [];
    let promises: Promise<unknown>[] = [];
    LlistaAssignatures.forEach(async (Assig) => {
      promises.push(
        new Promise((resolve) => {
          XatAssignatura.findOne({ assignaturaID: Assig.nomComplet, grauID: Assig.grauID }).then((xatAssig) => {
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
  const { LlistaAssignatures } = req.body;
  try {
    let xatAssignatura: Array<IXatAssignatura> = await getXats(LlistaAssignatures);
    return res.send({ xatAssignatura });
  } catch (error) {
    return res.send({ message: 'XatAssignatura not found' });
  }
};

export default requestMiddleware(getXatAssig);
