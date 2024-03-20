import React from 'react'

const index = () => {
  return (
    <>
      <div className='container'>
        <h2>Todo List</h2>
        <div>
          <input
            type="text"
            placeholder="Enter the name"
            className="inputBox"
          />
        </div>
      </div>
    </>
  );
}

export default index;