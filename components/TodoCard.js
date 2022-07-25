import React from "react";

export default function TodoCard(props) {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete
  } = props;

  return (
    // Note, when passing in props into a tag or component, you need the children.props in the rendered section
    // This enables the TodoCard tag to work properly, but does not use the props themselves. If we wanted to use the prop, we would need to specifically call it here i.e. props.key
    <div className="p-2 relative border sm:p-3 flex items-stretch border-white border-solid">
      <div className="flex-1 flex">
        {!(edit === todoKey) ? ( // if the current todocard key is NOT equal to the value of the todocard we want to edit 
          <>{children}</> 
        ) : ( // if the current todocard key is equal to the value of the todocard we want to edit 
          <input
            className="bg-inherit flex-1 text-white outline-none"
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
        {/* {children}  */}
      </div>
      <div className="flex items-center">
        {" "}
        {/* handleAddEdit will set the error key, which is then used within our above component to conditionally render either an input field, or */}
        {edit === todoKey ? (
          <i
            onClick={handleEditTodo}
            className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={handleAddEdit(todoKey)}
            className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></i>
        )}
        <i onClick={handleDelete(todoKey)} className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer "></i>
      </div>
    </div>
  );
}
