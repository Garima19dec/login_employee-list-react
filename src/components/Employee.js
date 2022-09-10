import React, { useState, useEffect } from "react";
import Header from "./Header";
import View from "./View";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("employees");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Employee = () => {
  // main array of objects state || Employees state || Employees array of objects
  const [employees, setEmployees] = useState(getDatafromLS());

  // input field states
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  // form submit event
  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    // creating an object
    let employee = {
      name,
      contact,
      address,
    };
    setEmployees([...employees, employee]);
    setName("");
    setContact("");
    setAddress("");
  };

  // delete Employee from LS
  const deleteEmployee = (name) => {
    const filteredEmployees = employees.filter((element, index) => {
      return element.name !== name;
    });
    setEmployees(filteredEmployees);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      <Header />
      <div className="wrapper">
        <h1>EmployeeList App</h1>
        <p>Add and view your Employee using local storage</p>
        <div className="main">
          <div className="form-container">
            <form
              autoComplete="off"
              className="form-group"
              onSubmit={handleAddEmployeeSubmit}
            >
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
              <br></br>
              <label>Contact</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setContact(e.target.value)}
                value={contact}
              ></input>
              <br></br>
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></input>
              <br></br>
              <button type="submit" className="btn btn-success btn-md">
                ADD EMPLOYEE
              </button>
            </form>
          </div>

          <div className="view-container">
            {employees.length > 0 && (
              <>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <View
                        employees={employees}
                        deleteEmployee={deleteEmployee}
                      />
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-danger btn-md"
                  onClick={() => setEmployees([])}
                >
                  Remove All
                </button>
              </>
            )}
            {employees.length < 1 && <div>No Employees are added yet</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
