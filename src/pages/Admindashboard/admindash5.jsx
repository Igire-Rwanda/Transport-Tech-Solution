import React, { useState, useEffect } from "react";
import "./admin.css";
import Sidebar from "../../component/sidebar";
import { useParams } from "react-router-dom";

const userForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newRole, setNewRole] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fine-pink-earthworm.cyclic.app/api/v2/role/readAllUsers`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorMsg('');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await fetch(
          `https://fine-pink-earthworm.cyclic.app/api/v2/role/read?email=${email}`
        );
        const data = await response.json();
        // setUsers(data.data);
        setUserId(data.data[0]._id);
        console.log(data.data[0]._id);
      } catch (error) {
        setErrorMsg("Failed to get users.");
      }
    };
    checkEmail();
  }, []);

  const [role, setRole] = useState("");
  const params = useParams();

  const assignRole = async () => {
    try {
      console.log(userId);
      const result = await fetch(
        `http://localhost:5000/api/v2/role/assign?id=${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ role: newRole }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      console.log(data);
      if (data.error == null) {
        window.alert("Role Changed successfully");
      } else {
        window.alert("Error occured while assigning role");
      }
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    
  };
  const handleCancel = () => {
    setSuccessMsg('Role change successful.');
    setSelectedUser('');
    setCurrentRole('');
    setNewRole('');
    setConfirmCheckbox(false);
  };
  const handleNewRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleConfirmCheckboxChange = (event) => {
    setConfirmCheckbox(event.target.checked);
  };
  const handleUserEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    checkEmail();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    assignRole();

    // Perform form validation
    if (selectedUser === "" || newRole === "" || !confirmCheckbox) {
      setErrorMsg("Please fill in all the fields and confirm the role change.");
      return;
    }
   
  };


    return (
        <>
        <div className="admin-container">
        <div className="cont-side">
        <Sidebar/>
        </div>

        <div className="admin-content">
          <div className="upper-part">
            <div className="part-one">
              <h4>
                WELCOME <span style={{ color: "#009AC7" }}>Admin.</span>
              </h4>
            </div>
            <div className="upbar">
              <div className="upicons">
                <i class="bx bx-search"></i>
                <i class="bx bx-bell"></i>
              </div>
              <div className="vertical"></div>
              <div className="credential">
                <h5>Tristan</h5>
                <p>tristanboo9@gmail.com</p>
              </div>
            </div>
 
          </div>
          <div className="line2"></div>
          <h4 className="head">User Role Change Form</h4>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <label htmlFor="user">User:</label>
                <select
                  id="user"
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.userName}_____{user.email}___{user.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-section">
                <label htmlFor="user">User Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleUserEmail}
                />
              </div>
              {/* <div className="form-section">
                <label htmlFor="currentRole">Current Role:</label>
                <input
                  type="text"
                  id="currentRole"
                  value={currentRole}
                  readOnly
                />
              </div> */}

              <div className="form-section">
                <label htmlFor="newRole">New Role:</label>
                <select
                  id="newRole"
                  value={newRole}
                  onChange={handleNewRoleChange}
                >
                  <option value="">Select a new role</option>
                  <option value="Driver">Driver</option>
                  <option value="Passenger">Passenger</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="form-section">
                <label className="confirm-checkbox">
                  <input
                    type="checkbox"
                    id="confirmCheckbox"
                    checked={confirmCheckbox}
                    onChange={handleConfirmCheckboxChange}
                  />
                  I confirm that I want to change the role of the user.
                </label>
              </div>

              <div className="form-section">
                <button type="submit" disabled={!confirmCheckbox}>
                  Save Changes
                </button>
                <button type="button">Cancel</button>
              </div>
            </form>
            <div className="success-message">{successMsg}</div>
            <div className="error-message">{errorMsg}</div>
          </div>
 
             </div>
           <div className="line2"></div>  
       <h4 className='head'>User Role Change Form</h4>
       <div className="another-form">
       <div className='form-container'>
       <form onSubmit={handleSubmit}>
         <div className="form-section">
 
          <label htmlFor="user">User:</label>
 
           <select id="user" value={selectedUser} onChange={handleUserChange}>
             <option value="">Select a user</option>
             {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="user">User Email:</label>
          <input type='email'  />
        </div>
        <div className="form-section">
          <label htmlFor="currentRole">Current Role:</label>
          <input type="text" />
        </div>
        <div className="form-section">
          <label htmlFor="newRole">New Role:</label>
          <select id="newRole" value={newRole} onChange={handleNewRoleChange}>
            <option value="">Select a new role</option>
            <option value="driver">Driver</option>
            <option value="passenger">Passenger</option>
          </select>
        </div>
        <div className="form-section">
          <label className="confirm-checkbox">
            <input
              type="checkbox"
              id="confirmCheckbox"
              checked={confirmCheckbox}
              onChange={handleConfirmCheckboxChange}
            />
             I confirm that I want to change the role of the user.
          </label>
        </div>
        <div className="form-section">
          <button type="submit" disabled={!confirmCheckbox}>
            Save Changes
          </button>
          <button type="button"  onClick={handleCancel}>
            Cancel
          </button>

        </div>
      </form>
      <div className="success-message">{successMsg}</div>
      <div className="error-message">{errorMsg}</div>
       
    </div>
    </div>
    </div>

    </>
  );
};
export default userForm;
