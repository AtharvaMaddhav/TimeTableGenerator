import React, { useEffect, useRef } from 'react'
import useDivideSubjects from '../hooks/useDivideSubjects';
import useCreateTT from '../hooks/useCreateTT';
import { BsPencilFill } from 'react-icons/bs';

const Result = ({ setShowRes, show, data }) => {

    const { teachers, subjects, lectures, weekdays, hours } = data;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const matrix = show ? useCreateTT(subjects, lectures, weekdays) : [];

    const teacherSubjectData = useDivideSubjects(subjects, teachers);

    const loadRef = useRef(null);

    useEffect(() => {
        loadRef.current.style.display = 'flex'
        let timer = setTimeout(() => { loadRef.current.style.display = 'none' }, 3000)
        return () => clearTimeout(timer)
    }, [show])

    return (
        <div className={`${show ? "flex" : "hidden"} p-6 gap-8 grow w-screen`}>
            <div ref={loadRef} className='absolute w-screen h-screen bg-white z-10 top-0 left-0 flex flex-col items-center justify-center'>
                <img className='scale-50' src="/loading.gif" alt="loading..." />
                <p className='text-sm -translate-y-24'>Customizing your time table...</p>
            </div>
            <div className='p-4 grow flex flex-col gap-4'>
                <table>
                    <tr><td>Teachers:</td> <td>{teachers}</td></tr>
                    <tr><td>Subjects:</td> <td>{subjects}</td></tr>
                    <tr><td>Lectures/week:</td> <td>{lectures}</td></tr>
                    <tr><td>Weekdays:</td> <td>{weekdays}</td></tr>
                    <tr><td>Hours: </td><td>{hours}</td></tr>
                </table>

                <table>
                    <thead>
                        <tr className='bg-primary text-white font-bold'>
                            <td>Teacher</td>
                            <td colSpan={teacherSubjectData[0]?.length}>Subjects</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teacherSubjectData?.map((data, i) => {
                                return <tr>
                                    <td>T{i + 1}</td>
                                    {
                                        data.map(sub => <td colSpan={data.length == 1 ? teacherSubjectData[0]?.length : 1}>S{sub}</td>)
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <table className='grow border-collapse shadow-xl drop-shadow-xl border-2 border-black'>
                <thead>
                    <tr className='font-bold'>
                        {
                            days.map((day, i) => (i < weekdays) ? <td>{day}</td> : '')
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        show && matrix.map((row, index) => {
                            return index == 3 ?
                                <>
                                    <tr>
                                        <td className='bg-zinc-200' colSpan={weekdays}>Lunch Break</td>
                                    </tr>
                                    <tr>
                                        {
                                            row.map((elem) => {
                                                return <td>
                                                    <div>
                                                        Subject {elem}
                                                    </div>
                                                    <div className='text-xs text-gray-500'>
                                                        CS3500{elem}
                                                    </div>
                                                </td>
                                            })
                                        }
                                    </tr>
                                </>
                                :
                                <tr>
                                    {
                                        row.map((elem) => {
                                            return <td>
                                                <div>
                                                    Subject {elem}
                                                </div>
                                                <div className='text-xs text-gray-500'>
                                                    CS3500{elem}
                                                </div>
                                            </td>
                                        })
                                    }
                                </tr>
                        })
                    }
                </tbody>
            </table>
            <div className='bg-zinc-100 flex flex-col p-8 mx-6 gap-4'>
                <button className='bg-sky-500 px-16 py-2 text-white w-full rounded-full' onClick={() => { window.print() }}>Print</button>
                <button className='text-sky-500 text-sm flex items-center justify-center gap-2' onClick={() => { setShowRes(false) }}>Edit <BsPencilFill /></button>
            </div>
        </div>
    )
}

export default Result