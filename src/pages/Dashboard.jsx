import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const saveEmployee = (emp) => {
    if (editing) {
      setEmployees(employees.map(e => e.id === emp.id ? emp : e));
      setEditing(null);
    } else {
      setEmployees([...employees, { ...emp, id: Date.now() }]);
    }
  };

  const filteredEmployees = employees.filter(e => {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (gender ? e.gender === gender : true) &&
      (status ? e.active === (status === "active") : true)
    );
  });

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <p>Total Employees: {employees.length}</p>

      <div className="filters">
        <input
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <EmployeeForm onSave={saveEmployee} editing={editing} />

      <EmployeeTable
        data={filteredEmployees}
        onEdit={setEditing}
        onDelete={(id) =>
          setEmployees(employees.filter(e => e.id !== id))
        }
      />
    </div>
  );
}
