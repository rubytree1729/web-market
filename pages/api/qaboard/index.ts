import { body, cookie, query } from "express-validator";
import QABoard, { qaBoard } from "../../../models/QABoard";
import { Err, Ok } from "../../../utils/server/commonError";
import { userHandler, validate } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";



const handler = userHandler()
    .get( // 유저 아이디로 검색해서 게시판 정보 돌려줌
        validateRequest([]),
        async (req, res) => {
            const { userid } = req.cookies
            const result = await QABoard.find({ userid })
            return Ok(res, result)
        }
    )
    .post(     //userid, qacategory, title, content 값을 받아서 db에 저장
        validateRequest([
            body("qacategory").isIn(["교환", "환불", "배송", "상품문의", "주문취소", "주문/결제", "이벤트"]),
            body("title").exists(),
            body("content").exists()]),
        async (req, res) => {
            // need auth
            const { userid } = req.cookies
            const { qacategory, title, content } = req.body
            const saveValue: qaBoard = { userid, qacategory, title, content, answer: false, date: new Date() }
            const result = await new QABoard(saveValue).save()
            return Ok(res, result)
        }
    )
    .put(  //qaid, qacategory, title, content, userid 값을 받아서 db에 수정
        validateRequest([
            body("qaid").isNumeric(),
            body("qacategory").isIn(["교환", "환불", "배송", "상품문의", "주문취소", "주문/결제", "이벤트"]),
            body("title").exists(),
            body("content").exists()]),
        async (req, res) => {
            // need auth
            const { userid } = req.cookies
            const { qaid, qacategory, title, content } = req.body
            const target: qaBoard | null = await QABoard.findOne({ userid, qaid })
            if (!target) {
                return Err(res, target)
            }
            const result = await QABoard.updateOne({ userid, qaid }, { $set: { qacategory, title, content, date: new Date() } })
            return Ok(res, result)
        }
    )
    .delete( // 유저 아이디로 검색해서 게시판 삭제함
        validateRequest([
            query("qaid").isNumeric()]),
        async (req, res) => {
            const { qaid } = req.query
            const target: qaBoard | null = await QABoard.findOne({ qaid })
            if (!target) {
                return Err(res, "qaboard not found")
            }
            await validate([cookie("userid").equals(target.userid)])(req, res)
            const result = await QABoard.deleteOne({ qaid })
            return Ok(res, result)
        }
    )

export default handler;