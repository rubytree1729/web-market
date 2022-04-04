import type { NextPage } from 'next'
import React, { EventHandler, MouseEventHandler, useState } from 'react'


const CheckTable: NextPage<{ data: Array<any>, column: any, setCheckedList: Function, index: string }> = ({ data, column, setCheckedList, index }) => {
    function changeCheckedList(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const element = event.currentTarget.value
        const isChecked = event.currentTarget.checked
        if (isChecked) {
            setCheckedList((value: Array<string>) => {
                value.push(element)
                console.log("value:", value)
                return value
            })
        } else {
            setCheckedList((value: Array<string>) => {
                value.splice(value.indexOf(element), 1)
                console.log("value:", value)
                return value
            })
        }
    }
    console.log(data)
    return (
        <div className='table-responsive'>
            <table className="table align-middle text-center table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        {Object.keys(column).map((col: string) => <th scope="col">{col}</th>)}
                        <th scope="col">체크</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rows: any) =>
                        <tr>
                            {Object.values(rows).map((row: any) => <td>{row}</td>)}
                            <td>
                                <input className="form-check-input" type="checkbox" onClick={changeCheckedList} value={rows[index]} />
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default CheckTable