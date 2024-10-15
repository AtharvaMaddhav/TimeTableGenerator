import React, { useEffect, useState } from 'react'
import Result from './Result';
import useDivideSubjects from '../hooks/useDivideSubjects';
import { GiTeacher } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { TbNumbers } from "react-icons/tb";
import { BsArrowBarRight, BsCalendarWeek } from "react-icons/bs";
import { LuCalendarClock, LuComputer } from "react-icons/lu";
import { MdOutlineComputer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Form = ({data, setData}) => {
    const  navigate = useNavigate()
    const [teachers, setTeachers] = useState(0);
    const [subjects, setSubjects] = useState(0);
    const [lectures, setLectures] = useState(0);
    const [weekdays, setWeekDays] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        setData([...Array.from({ length: subjects }).fill({
            name: "",
            code: "",
            l: 0,
            t: 0,
            p: 0
        })])
    }, [subjects])

    const [errorMsg, setErrorMsg] = useState("");
    const [showRes, setShowRes] = useState(false);

    const handleSubmit = () => {
        // clear the error message...
        setErrorMsg("");

        // validate inputs...
        if (teachers < 1 || teachers > 20) {
            setErrorMsg("Number of teachers must be 1 - 20");
            return;
        }

        if (subjects < 1 || subjects > 10) {
            setErrorMsg("Number of subjects must be 1 - 10");
            return;
        }
        if (weekdays < 1 || weekdays > 6) {
            setErrorMsg("Number of weekdays must be 1 - 6");
            return;
        }
        if (hours < 1 || useDivideSubjects(subjects, teachers)[0]?.length * lectures > hours) {
            setErrorMsg("*The load is getting higher than working hours limit");
            return;
        }
        setShowRes(true);
    }
    const handleSubject = (i, key, value) => {
        if (!key && !value) return;
        let dataCopy = data;
        dataCopy[i] = { ...dataCopy[i], [key]: value };
        setData([...dataCopy])
    }

    return (
        <div className='flex grow'>

            <form className={`${showRes ? "hidden" : "grid"}  grow p-4`}>

                <div className='grid-cols-2 grid rounded-md bg-zinc-100'>
                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                        <label className='flex items-center gap-4' ><GiTeacher size={30} /> Number of Teachers: </label>
                        <input value={teachers} onChange={(e) => { setTeachers(e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                    </div>

                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                        <label className='flex items-center gap-4'> <BsCalendarWeek size={25} /> Number of Weekdays: </label>
                        <input value={weekdays} onChange={(e) => { setWeekDays(e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                    </div>

                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                        <label className='flex items-center gap-4'> <SiBookstack size={30} />Number of Subjects: </label>
                        <input value={subjects} onChange={(e) => { setSubjects(e.target.value); }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                    </div>

                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                        <label className='flex items-center gap-4'> <LuCalendarClock size={30} /> Number of working hours / teacher / week: </label>
                        <input value={hours} onChange={(e) => { setHours(e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                    </div>
                </div>

                <div className='p-4'>
                    {
                        subjects ? Array.from({ length: subjects }, (_, i) => (
                            <div className="p-4">
                                <p className='px-8 font-bold'>Subject {i + 1}</p>

                                <div className='grid grid-cols-2'>
                                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                                        <label className='flex items-center gap-4'> <TbNumbers size={30} />Name </label>
                                        <input onChange={(e) => { handleSubject(i, "name", e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="" name="" id="" />
                                    </div>

                                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                                        <label className='flex items-center gap-4'> <LuComputer size={30} /> Subject Code </label>
                                        <input onChange={(e) => { handleSubject(i, "code", e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="" name="" id="" />
                                    </div>
                                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                                        <label className='flex items-center gap-4'> <GiTeacher size={30} />Number of Theory Lectures </label>
                                        <input onChange={(e) => { handleSubject(i, "l", e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                                    </div>

                                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                                        <label className='flex items-center gap-4'> <LuComputer size={30} /> Number of Tutotials </label>
                                        <input onChange={(e) => { handleSubject(i, "t", e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                                    </div>

                                    <div className=' flex items-center w-[678px] mx-auto justify-between space-x-8 p-4'>
                                        <label className='flex items-center gap-4'> <MdOutlineComputer size={30} /> Number of labs: </label>
                                        <input onChange={(e) => { handleSubject(i, "p", e.target.value) }} className='focus:outline-none bg-gray-200 p-2' type="number" name="" id="" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                            : ""
                    }
                </div>

                <p className='text-red-500 mx-auto'>{errorMsg}</p>

                <button onClick={() => navigate('/result')} className='bg-sky-500 text-white w-fit px-8 py-3 h-min mt-4 rounded-full mx-auto flex items-center gap-4 hover:bg-sky-700' type="button">Generate Time Table <BsArrowBarRight size={20} /> </button>
            </form>
        </div>
    )
}

export default Form