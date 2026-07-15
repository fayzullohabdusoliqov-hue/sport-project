import React, { useEffect, useState } from "react";
import "./TeacherHome.css";
import { useNavigate } from "react-router-dom";

function TeacherHome() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate("")

  const profile = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    try {
      const res = await fetch(
        "https://sport-project-18919-default-rtdb.firebaseio.com/groups.json"
      );

      const data = await res.json();

      if (!data) return;

      const array = Object.entries(data).map(([key, value]) => ({
        firebaseKey: key,
        ...value,
      }));
      console.log(array)

      const myGroups = array.filter(
        (group) => group.teacherName == profile.name
      );
      console.log(profile.name)

      setGroups(myGroups);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <main className="teacher">
      <h1 className="teacher__title">Mening guruhlarim</h1>

      <div className="teacher__wrapper">
        {groups.map((group) => (
          <div className="teacher__card" key={group.firebaseKey}>
            <h2>{group.groupName}</h2>

            <p>
              <strong>O'qituvchi:</strong> {group.teacherName}
            </p>
            <p>
              <strong>O'quvchilar:</strong> {group.students.length}
            </p>

            <button onClick={(evt) => {
              evt.preventDefault()
              navigate(`/teacher/homeDetail/${group.firebaseKey}`)
            }}>
              Batafsil
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TeacherHome;