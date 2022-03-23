import Link from "next/link";
import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import customAxios from "../../utils/customAxios";
import passwordChangeStyle from "../../styles/mypage/passwordChange.module.css"


interface passwordInput {
    currentpassword: string
    newpassword: string
    passwordConfirm: string
}

export default function App() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm<passwordInput>({
        mode: "onBlur"
    });
    const newpassword = useRef("string")
    newpassword.current = watch("newpassword")
    const onSubmit: SubmitHandler<passwordInput> = async data => {
        alert(JSON.stringify(data, null, 2))
        try {
            const request = await customAxios.post("", data)
            if (request.status === 200) {
                if (request.data.result === true) {
                    alert("변경되었습니다")
                } else
                    alert("이전 비밀번호와 같습니다.")
                console.log(request.data)
            }
            return request.data
        } catch (err) {
            alert("잘못된 접근입니다")
            console.log(err)
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={passwordChangeStyle.content}>
                <div className={passwordChangeStyle.input}>
                    <span className={passwordChangeStyle.password}>현재 비밀번호</span>
                    <input className={passwordChangeStyle.n_input} type="password" {...register("currentpassword",
                        {
                            required: "현재 비밀번호를 입력해 주세요"
                        })} />
                    {errors.currentpassword && <span className="validation">{errors.currentpassword.message}</span>}
                </div>
                <div className={passwordChangeStyle.input}>
                    <span className={passwordChangeStyle.password}>신규 비밀번호</span>
                    <input className={passwordChangeStyle.n_input} type="password" {...register("newpassword",
                        ({
                            required: "신규 비밀번호를 입력해주세요",
                            pattern: {
                                value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
                                message: "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                            }
                        }))} />
                    {errors.newpassword && <span className="validation">{errors.newpassword.message}</span>}
                </div>
                <div className={passwordChangeStyle.input}>
                    <span className={passwordChangeStyle.password}>신규 비밀번호 재입력</span>
                    <input className={passwordChangeStyle.n_input} type="password" {...register("passwordConfirm",
                        {
                            required: true,
                            validate: (value) => value === newpassword.current
                        })} />
                    {errors.passwordConfirm && errors.passwordConfirm.type === "required" &&
                        <span className="validation">신규 비밀번호 재입력을 입력해주세요</span>}
                    {errors.passwordConfirm && errors.passwordConfirm.type === "validate" &&
                        <span className="validation">비밀번호가 일치 하지 않습니다.</span>}
                </div>
                <div className={passwordChangeStyle.btn_group}>
                    <Link href="/mypage" passHref>
                        <button>뒤로가기</button >
                    </Link>
                    <button type="submit">비밀번호 변경</button>
                </div>
            </div>
        </form>
    );
}
