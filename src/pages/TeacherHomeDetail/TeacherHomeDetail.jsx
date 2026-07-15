import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TeacherHomeDetail.css";

function TeacherHomeDetail() {
    const { firebaseKey } = useParams();

    const [group, setGroup] = useState(null);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    const [selectedAttendance, setSelectedAttendance] = useState({
        studentIndex: null,
        date: "",
    });
    function openAttendance(studentIndex, date) {
        setSelectedAttendance({
            studentIndex,
            date,
        });

        setOpenModal(true);
    }

    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        try {
            const res = await fetch(
                `https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`
            );

            const data = await res.json();

            if (!data) return;

            const today = new Date().toISOString().split("T")[0];

            let changed = false;

            const students = (data.students || []).map((student) => {
                let list = student.list || [];

                const exist = list.some((item) => item.date === today);

                if (!exist) {
                    changed = true;

                    list = [
                        ...list,
                        {
                            date: today,
                            status: "",
                        },
                    ];
                }

                return {
                    ...student,
                    list,
                };
            });

            if (changed) {
                await fetch(
                    `https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            students,
                        }),
                    }
                );
            }

            const allDates = [
                ...new Set(
                    students.flatMap((student) =>
                        student.list.map((item) => item.date)
                    )
                ),
            ];

            allDates.sort(
                (a, b) => new Date(a) - new Date(b)
            );

            setDates(allDates);

            setGroup({
                ...data,
                students,
            });

            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function changeAttendance(status) {
        const students = group.students.map(student => ({
            ...student,
            list: [...student.list],
        }));

        const student = students[selectedAttendance.studentIndex];

        const attendanceIndex = student.list.findIndex(
            (item) => item.date === selectedAttendance.date
        );

        if (attendanceIndex !== -1) {
            student.list[attendanceIndex].status = status;
        }

        try {
            await fetch(
                `https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        students,
                    }),
                }
            );

            setGroup({
                ...group,
                students,
            });

            setOpenModal(false);
        } catch (err) {
            console.log(err.message);
        }
    }
    if (loading) {
        return (
            <main className="teacherDetail">
                <h2>Loading...</h2>
            </main>
        );
    }

    return (<>
        <main className="teacherDetail">

            <div className="teacherDetail__top">

                <div>
                    <h1>{group.groupName}</h1>
                    <p>{group.teacherName}</p>
                </div>

                <h2>
                    Students: {group.students.length}
                </h2>

            </div>

            <div className="teacherDetail__tableWrapper">

                <table className="teacherDetail__table">

                    <thead>

                        <tr>

                            <th>No</th>

                            <th>Name</th>

                            <th>Surname</th>

                            {
                                dates.map((date) => (
                                    <th key={date}>
                                        {date}
                                    </th>
                                ))
                            }
                            <th>Bor</th>
                            <th>Yo'q</th>
                            <th>Kech</th>
                            <th>Foiz</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            group.students.map((student, index) => {

                                const present = student.list.filter(
                                    (item) => item.status === "Bor"
                                ).length;

                                const percent = student.list.length
                                    ? Math.round((present / student.list.length) * 100)
                                    : 0;

                                const absent = student.list.filter(
                                    (item) => item.status === "Yo'q"
                                ).length;

                                const late = student.list.filter(
                                    (item) => item.status === "Kech qoldi"
                                ).length;

                                return (
                                    <tr key={index}>

                                        <td>{index + 1}</td>

                                        <td>{student.name}</td>

                                        <td>{student.surName}</td>

                                        {
                                            dates.map((date) => {

                                                const attendance = student.list.find(
                                                    (item) => item.date === date
                                                );

                                                return (
                                                    <td
                                                        key={date}
                                                        onClick={() => {
                                                            if (date === today) {
                                                                openAttendance(index, date);
                                                            }
                                                        }}
                                                        style={{
                                                            cursor: date === today ? "pointer" : "not-allowed",
                                                            opacity: date === today ? 1 : 0.75,
                                                        }}
                                                    >
                                                        <span
                                                            className={
                                                                attendance?.status === "Bor"
                                                                    ? "badge present"
                                                                    : attendance?.status === "Yo'q"
                                                                        ? "badge absent"
                                                                        : attendance?.status === "Kech qoldi"
                                                                            ? "badge late"
                                                                            : "badge empty"
                                                            }
                                                        >
                                                            {attendance?.status || "-"}
                                                        </span>
                                                    </td>
                                                );

                                            })
                                        }
                                        <td>{present}</td>

                                        <td>{absent}</td>

                                        <td>{late}</td>

                                        <td>
                                            <span className="percentBadge">
                                                {percent}%
                                            </span>
                                        </td>

                                    </tr>
                                );

                            })
                        }
                    </tbody>
                    <tfoot>

                        <tr>

                            <td colSpan={dates.length + 7}>

                                Jami o'quvchilar:
                                <b> {group.students.length}</b>

                            </td>

                        </tr>

                    </tfoot>
                </table>
            </div>
        </main>
        {openModal && (
            <div
                className="attendanceModal"
                onClick={() => setOpenModal(false)}
            >
                <div
                    className="attendanceModal__content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Davomatni tanlang</h2>

                    <button
                        className="presentBtn"
                        onClick={() => changeAttendance("Bor")}
                    >
                        🟢 Bor
                    </button>

                    <button
                        className="lateBtn"
                        onClick={() => changeAttendance("Kech qoldi")}
                    >
                        🟡 Kech qoldi
                    </button>

                    <button
                        className="absentBtn"
                        onClick={() => changeAttendance("Yo'q")}
                    >
                        🔴 Yo'q
                    </button>

                    <button
                        className="closeBtn"
                        onClick={() => setOpenModal(false)}
                    >
                        Bekor qilish
                    </button>
                </div>
            </div>
        )}
    </>);
}

export default TeacherHomeDetail;