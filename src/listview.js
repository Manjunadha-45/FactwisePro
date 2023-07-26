import React, { useState, useEffect } from 'react';
import './listview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Listview = () => {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getproducts();
  }, []);

  async function getproducts() {
    let data = await fetch("json/celebrities.json");
    let productlist = await data.json();
    setData(productlist);
    console.log(productlist[0].id);
  }

  function showDetailsToggle(list) {
    setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        [list.id]: !prevShowDetails[list.id]
      }));
      setEditData(null);
  }

  function showEdit(list) {
    if(age(list.dob)>18){
      setEditData({ ...list });
      setShowDetails(prevShowDetails => ({
        ...prevShowDetails,
        [list.id]: true // Set to true when clicking edit to show details
      }));
    }
    else{
      alert("To update Celebrity must be adult");
    }
   
  }

  function handleDelete(productId) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedData = data.filter((item) => item.id !== productId);
      setData(updatedData);
      setEditData(null);
    }
  }

  function handleSave(updatedData) {
    const updatedProductList = data.map((item) =>
      item.id === updatedData.id ? { ...item, ...updatedData } : item
    );
    setData(updatedProductList);
    setEditData(null);
    setShowDetails(prevShowDetails => ({
      ...prevShowDetails,
      [updatedData.id]: true // Set to true when saving to show details again
    }));
  }

  return (
    <>
      {data.map((list) => (
        <div key={list.id}   className={`listbox ${showDetails[list.id] ? "expanded" : ""}`}id={list.id}>
          <div className='title'>
            <img src={list.picture} alt='user img' />
            <p id='name'>{list.first} {list.last}</p>
            
            <h1 onClick={() => showDetailsToggle(list)}>
              {showDetails[list.id] ? '-' : '+'}
            </h1>
          </div>
          {showDetails[list.id] && !editData && (
            <div className='details'>
              <div className='age'>
                <div className='child'>
                  <span>Age</span>
                  <p>{age(list.dob)}</p>
                  
                </div>
                <div className='child'>
                  <span>Gender</span>
                  <p>{list.gender}</p>
                </div>
                <div className='child'>
                  <span>Country</span>
                  <p>{list.country}</p>
                </div>
              </div>
              <div className='description'>
                <p>Description</p>
                <p className='content'>
                  {list.description}
                </p>
              </div>
              <div className='buttons'>
                <p><FontAwesomeIcon icon={faTrash} id='delete' onClick={() => handleDelete(list.id)} /></p>
                <p><FontAwesomeIcon icon={faEdit} id='edit' onClick={() => showEdit(list)} /></p>
              </div>
            </div>
          )}
          {editData && showDetails[list.id] && (
  <Editlist
    data={editData}
    onSave={(updatedData) => handleSave(updatedData)}
    onCancel={() => setEditData(null)}
    setEditData={setEditData} 
  />
)}
        </div>
      ))}
    </>
  );
};

function age(date) {
  const today = new Date();
  const dob = new Date(date);
  var age = today.getFullYear() - dob.getFullYear();
  var month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export default Listview;
export function Editlist({ data, onSave, onCancel, setEditData }) {
    const handleSaveClick = () => {
      onSave(data);
    };
   
  
    return (
        
      <div className={`listbox expanded`} id='listbox'>
        
        <div className='title'>
         
          
        </div>
        <div className='details'>
          <div className='age'>
            <div className='child'>
              <span>Age</span>
              <input
                type='number'
                name='age'
                value={data.age}
                onChange={(e) => setEditData({ ...data, age: parseInt(e.target.value) })}
              />
            </div>
            <div className='child'>
              <span>Gender</span>
              <select
              name='gender'
              value={data.gender}
              onChange={(e) => setEditData({ ...data, gender: e.target.value })}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
            </div>
            <div className='child'>
              <span>Country</span>
              <input
                type='text'
                name='country'
                value={data.country}
                onChange={(e) => setEditData({ ...data, country: e.target.value })}
              />
            </div>
          </div>
          <div className='description'>
            <p>Description</p>
            <textarea
              name='description'
              value={data.description}
              onChange={(e) => setEditData({ ...data, description: e.target.value })}
            />
          </div>
          <div className='buttons'>
          <button onClick={onCancel} ><span className="material-symbols-rounded" id='delete'>close</span></button>
          <button onClick={handleSaveClick}><span className="material-symbols-rounded" id='edit'>done</span></button>
          </div>
        </div>
      </div>
    );
  }
  
  
