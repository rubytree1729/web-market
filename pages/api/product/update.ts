import type { NextApiRequest, NextApiResponse } from 'next'
import { Err } from '../../../utils/commonError'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return Err(res, "not implemented yet")
}