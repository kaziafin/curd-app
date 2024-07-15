import React, { useState } from 'react';
import DataTable from './DataTable';

const UserData = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.gender &&
      formData.age
    ) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
      };
      setData((prevData) => {
        const newData = [...prevData, newItem];
        console.log(newData); // Log the new state here
        return newData;
      });
      setFormData({ name: '', email: '', phone: '', gender: '', age: '' });
    }
  };

  return (
    <div className='container'>
      <div className='add-container'>
        <div className='info-container'>
          <input
            type='text'
            placeholder='Name'
            className='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Email'
            className='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Phone'
            className='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='gender'
            className='gender'
            name='gender'
            value={formData.gender}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='age'
            className='age'
            name='age'
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button className='add' onClick={handleAddClick}>
          ADD
        </button>
        <DataTable data={data} setData={setData} />
      </div>
    </div>
  );
};

export default UserData;
