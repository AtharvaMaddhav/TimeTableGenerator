import React, { useEffect, useState } from 'react'

const Result = ({ data }) => {
    let x = 0;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    // const data = [
    //     { name: "Computer Networks", code: "CO34007", l: 3, t: 1, p: 1 },
    //     { name: "Operating Systems", code: "CO35005", l: 3, t: 1, p: 0 },
    //     { name: "Theory of Computation", code: "CO34002", l: 3, t: 1, p: 0 },
    //     { name: "Database Management System", code: "CO34005", l: 3, t: 1, p: 1 },
    //     { name: "Agile Software Methodology", code: "CO34014", l: 3, t: 0, p: 1 },
    //     { name: "Design Thinkinh-II", code: "CO34452", l: 0, t: 0, p: 1 },
    //     { name: "Skill Development Lab", code: "CO34451", l: 0, t: 0, p: 1 },
    //     { name: "Eessence of Indian Knowledge", code: "HUM3401", l: 2, t: 0, p: 0 }
    // ];

    const [timetable, setTimeTable] = useState([]);
    const [max, setmax] = useState(0)

    useEffect(() => {
        const tt = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: []
        }
        // Helper function to distribute classes
        function distributeClasses(subject, key, count) {
            let distributed = 0;
            let i;
            for (i = x; distributed < count; i = (i + 2) % days.length) {
                if (key == "Lab") {
                    let arr = tt[days[i]];
                    let lastVal = arr[arr.length - 1]
                    if (lastVal?.includes("Lab") || (tt[days[i]].length == 1))
                        i = (i + 1) % days.length
                    tt[days[i]].push(`${subject.name} (${key})`)
                }
                tt[days[i]].push(`${subject.name} (${key})`)
                distributed++;
            }
            x = i;
        }

        // Populate the timetable
        data?.forEach((subject) => {
            // Distribute lectures across the week
            distributeClasses(subject, 'Lecture', subject.l);

            // Allocate tutorial on the first available day
            distributeClasses(subject, 'Tutorial', subject.t);

            // Allocate lab (if present) on any available day
            if (subject.p > 0) {
                distributeClasses(subject, 'Lab', subject.p);
            }
        });


        setTimeTable(Object.values(tt));
        let arr = [];
        Object.values(tt).forEach(d => arr.push(d.length))
        let max = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i]
        }
        setmax(max)
    }, [])

    const Time = ({ from, to }) => {
        return (
            <div className='time text-center py-6 bg-purple-600'>
                <div className=' text-white p-2.5 text-sm'>{from} - {to}</div>
            </div>
        )
    }

    const WeekDay = ({ name }) => {
        return (
            <div className='p-3 self-stretch flex items-center justify-center text-xs bg-purple-700 text-white '>{name}</div>
        )
    }

    // SUBJECT COMPONENT
    const Subject = ({ type: t = "l", name: n = "No Lecture", code: c = "COXXX" }) => {
        const [show, setShow] = useState(false);
        const [name, setName] = useState(n);
        const [code, setCode] = useState(c);
        const [type, setType] = useState(t);
        return (
            data?.length && <div className='flex flex-col items-center p-4 relative'>
                <div className='text-xs bg-blue-500 text-white p-1 rounded-md w-min'>{code}</div>
                <div onMouseLeave={() => { setShow(false) }} onClick={() => { setShow(true) }} className={` ${type === "l" && 'bg-red-300'} ${type === "t" && 'bg-pink-400 '} ${type === "p" && 'bg-teal-300'} hover:cursor-pointer font-bold shadow-lg text-xs p-2 rounded-md`}>{name}</div>
                <div onMouseLeave={() => { setShow(false) }} onMouseEnter={() => { setShow(true) }} className={`${show ? 'flex' : 'hidden'} flex-col absolute top-[-70%] w-72 z-10 bg-black/80 text-white rounded-md p-4 text-xs`}>
                    <div className="space-x-2 my-2">
                        <button onClick={() => setType("l")} className='px-4 text-xs bg-red-500 rounded-full'>L</button>
                        <button onClick={() => setType("t")} className='px-4 text-xs bg-pink-500 rounded-full'>T</button>
                        <button onClick={() => setType("p")} className='px-4 text-xs bg-teal-500 rounded-full'>P</button>
                        <button onClick={() => { setName("No Lecture"); setCode("COXXX") }} className='px-4 text-xs bg-black rounded-full'>Remove</button>
                    </div>
                    <ul className='space-y-2 '>
                        {
                            data.map(s => <li onClick={() => { setName(s['name']); setCode(s['code']); }} className='cursor-pointer hover:text-blue-400'>{s['name']}</li>
                            )}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        data?.length && <div className='grow flex flex-col'>
            <div className='px-4 py-4 text-sm flex'>
                <div className='flex gap-4'>
                    <div className='bg-red-300 hover:bg-red-300 inline-block px-4 py-2 rounded-full'>Lecture</div>
                    <div className='bg-pink-400 hover:bg-green-300 inline-block px-4 py-2 rounded-full'>Tutorial</div>
                    <div className='bg-teal-300 hover:bg-orange-300 inline-block px-4 py-2 rounded-full'>Practical</div>
                </div>
                <button className='bg-sky-500 px-8 ml-auto py-1 inline-block text-white rounded-full' onClick={() => { window.print() }}>Print</button>
            </div>

            <div className='grow mx-4 rounded-md flex bg-red-100'>
                <div className=' flex flex-col bg-purple-500  '>
                    <div className='bg-purple-700  text-purple-700 p-2.5 text-sm'>1</div>
                    {
                        Array.from({ length: max }, (_, i) => (
                            i <= 2 ? <Time from={(10 + i) + ":00"} to={(11 + i) % 12 === 0 ? 12 + ":00" : (11 + i) % 12 + ":00"} /> : <Time from={(10 + i + 1) % 12 + ":00"} to={(11 + i + 1) % 12 + ":00"} />

                        ))
                    }

                </div>

                {
                    timetable && timetable.map((t, i) => (

                        <div className='col'>
                            <WeekDay name={days[i]} />
                            {
                                Array.from({ length: max }, (_, i) => (
                                    <>
                                        <Subject type={t[i]?.includes("Lab") ? 'p' : t[i]?.includes("Tutorial") ? 't' : "l"} name={t[i]?.split('(')[0]} code={data.filter(s => s.name === t[i]?.split('(')[0]?.trim())[0]?.code} />
                                    </>
                                ))
                            }

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Result