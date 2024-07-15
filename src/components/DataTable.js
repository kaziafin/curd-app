import React, { useEffect, useState, useMemo } from 'react';

const DataTable = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const itemsPerPage = 5;

  // Filter items based on the search term
  const filterItems = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Get paginated data for the current page
  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filterItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filterItems, currentPage]);

  // Handle search term change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset current page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle editing a row
  const handleEdit = (id, updatedData) => {
    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);
    setEditId(null);
  };

  // Handle deleting a row
  const handleDelete = (id) => {
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);

    // Adjust current page if the last item on the page is deleted
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='search-table-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td
                contentEditable={editId === item.id}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleEdit(item.id, { name: e.target.innerText })
                }
              >
                {item.name}
              </td>
              <td
                contentEditable={editId === item.id}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleEdit(item.id, { email: e.target.innerText })
                }
              >
                {item.email}
              </td>
              <td
                contentEditable={editId === item.id}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleEdit(item.id, { phone: e.target.innerText })
                }
              >
                {item.phone}
              </td>
              <td
                contentEditable={editId === item.id}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleEdit(item.id, { gender: e.target.innerText })
                }
              >
                {item.gender}
              </td>
              <td
                contentEditable={editId === item.id}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEdit(item.id, { age: e.target.innerText })}
              >
                {item.age}
              </td>
              <td className='action'>
                <button
                  className='edit'
                  onClick={() => setEditId(editId === item.id ? null : item.id)}
                >
                  {editId === item.id ? 'Save' : 'Edit'}
                </button>
                <button
                  className='delete'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from(
          { length: Math.ceil(filterItems.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              style={{
                backgroundColor:
                  currentPage === index + 1 ? 'lightgreen' : 'white',
              }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DataTable;
