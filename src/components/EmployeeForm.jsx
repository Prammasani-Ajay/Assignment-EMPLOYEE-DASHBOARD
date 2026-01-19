import { useEffect, useState } from "react";

export default function EmployeeForm({ onSave, editing }) {

  const emptyForm = {
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.gender) {
      alert("Name and Gender are required");
      return;
    }

    onSave(form);
    setForm(emptyForm);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>{editing ? "Edit Employee" : "Add Employee"}</h3>

      <div className="form-grid">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={change}
        />

        <select name="gender" value={form.gender} onChange={change}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={change}
        />

        <select name="state" value={form.state} onChange={change}>
          <option value="">State</option>
          <option>AP</option>
          <option>TS</option>
          <option>KA</option>
        </select>

        <input type="file" onChange={imageChange} />

        {form.image && <img src={form.image} width="50" />}

        <div className="form-actions">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={change}
            />{" "}
            Active
          </label>

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
