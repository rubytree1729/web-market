import type { NextApiRequest, NextApiResponse } from 'next'
import { Err } from '../../../utils/server/commonError'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return Err(res, "not implemented yet")
}