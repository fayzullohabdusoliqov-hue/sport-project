import React, { useEffect, useState } from "react";
import "./OperatorHome.css";
import OperatorHomeItem from "../../components/OperatorHomeItem/OperatorHomeItem";

function OperatorHome() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [form, setForm] = useState({
    teacherName: "",
    groupName: "",
    name: "",
    surName: "",
    phone: "",
    monthlySum: "",
  });

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    try {
      const res = await fetch(
        "https://sport-project-18919-default-rtdb.firebaseio.com/groups.json"
      );

      const data = await res.json();

      if (!data) return;

      const groupsArray = Object.entries(data).map(([key, value]) => ({
        firebaseKey: key,
        ...value,
      }));

      setGroups(groupsArray);

      const teacherArray = [
        ...new Set(groupsArray.map((item) => item.teacherName)),
      ];

      setTeachers(teacherArray);

      let studentsArray = [];

      groupsArray.forEach((group) => {
        group.students.forEach((student) => {
          studentsArray.push({
            ...student,
            teacherName: group.teacherName,
            groupName: group.groupName,
            firebaseKey: group.firebaseKey,
          });
        });
      });

      setStudents(studentsArray);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function addStudent() {
    const group = groups.find(
      (item) =>
        item.teacherName === form.teacherName &&
        item.groupName === form.groupName
    );

    if (!group) return;

    const newStudents = [
      ...group.students,
      {
        name: form.name,
        surName: form.surName,
        phone: form.phone,
        monthlySum: form.monthlySum,
      },
    ];

    await fetch(
      `https://sport-project-18919-default-rtdb.firebaseio.com/groups/${group.firebaseKey}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          students: newStudents,
        }),
      }
    );

    getStudents();

    setForm({
      teacherName: "",
      groupName: "",
      name: "",
      surName: "",
      phone: "",
      monthlySum: "",
    });

    setOpenModal(false);
  }

  const filteredGroups = groups.filter(
    (item) => item.teacherName === form.teacherName
  );

  return (
    <>
      <main className="admin__main">
        <section className="operator__search">
          <h1 className="operator_title">SEARCH</h1>

          <button
            className="operator_btn"
            onClick={(evt) => {
              evt.preventDefault()
              setOpenModal(true)}}
          >
            + Student qo'shish
          </button>
        </section>

        <section className="operator__students">
          <table className="operator__table">
            <thead>
              <tr>
                <th>No</th>
                <th>Teacher</th>
                <th>Group</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone</th>
                <th>Monthly</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <OperatorHomeItem
                  key={index}
                  index={index}
                  student={student}
                  onClick={() => setSelectedStudent(student)}
                />
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={7}>Students: {students.length}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>

    
      {selectedStudent && (
        <div
          className="modal"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Student ma'lumotlari</h2>

            <p>
              <b>Teacher:</b> {selectedStudent.teacherName}
            </p>

            <p>
              <b>Group:</b> {selectedStudent.groupName}
            </p>

            <p>
              <b>Name:</b> {selectedStudent.name}
            </p>

            <p>
              <b>Surname:</b> {selectedStudent.surName}
            </p>

            <p>
              <b>Phone:</b> {selectedStudent.phone}
            </p>

            <p>
              <b>Monthly:</b> {selectedStudent.monthlySum}
            </p>

            <button onClick={() => setSelectedStudent(null)}>
              Yopish
            </button>
          </div>
        </div>
      )}

      {openModal && (
        <div className="modal" onClick={() => setOpenModal(false)}>
          <div
            className="modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="operator__modal-content">
              <h2>O'quvchi qo'shish</h2>
            <button className="close_btn" onClick={(evt) => {
              evt.preventDefault()
              setOpenModal(false)
            }}>&times;</button>
            </div>

            <select
              value={form.teacherName}
              onChange={(e) =>
                setForm({
                  ...form,
                  teacherName: e.target.value,
                  groupName: "",
                })
              }
            >
              <option value="">Teacher tanlang</option>

              {teachers.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>

            {form.teacherName && (
              <select
                value={form.groupName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    groupName: e.target.value,
                  })
                }
              >
                <option value="">Group tanlang</option>

                {filteredGroups.map((group) => (
                  <option
                    key={group.firebaseKey}
                    value={group.groupName}
                  >
                    {group.groupName}
                  </option>
                ))}
              </select>
            )}

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Surname"
              value={form.surName}
              onChange={(e) =>
                setForm({
                  ...form,
                  surName: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              placeholder="Monthly Sum"
              value={form.monthlySum}
              onChange={(e) =>
                setForm({
                  ...form,
                  monthlySum: e.target.value,
                })
              }
            />

            <button onClick={addStudent}>
              Saqlash
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OperatorHome;