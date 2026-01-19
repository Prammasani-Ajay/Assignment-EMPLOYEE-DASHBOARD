export default function EmployeeTable({ data, onEdit, onDelete }) {

  const printRow = (employee) => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Employee Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h2 {
              margin-bottom: 15px;
            }
            p {
              margin: 6px 0;
            }
            img {
              border-radius: 50%;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <h2>Employee Details</h2>
          ${employee.image ? `<img src="${employee.image}" width="80" />` : ""}
          <p><b>Name:</b> ${employee.name}</p>
          <p><b>Gender:</b> ${employee.gender}</p>
          <p><b>Date of Birth:</b> ${employee.dob}</p>
          <p><b>State:</b> ${employee.state}</p>
          <p><b>Status:</b> ${employee.active ? "Active" : "Inactive"}</p>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="7">No employees found</td>
            </tr>
          )}

          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.image && <img src={e.image} width="40" />}</td>
              <td>{e.name}</td>
              <td>{e.gender}</td>
              <td>{e.dob}</td>
              <td>{e.state}</td>
              <td>{e.active ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => onEdit(e)}>Edit</button>{" "}
                <button
                  className="danger"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this employee?")) {
                      onDelete(e.id);
                    }
                  }}
                >
                  Delete
                </button>{" "}
                <button className="secondary" onClick={() => printRow(e)}>
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
