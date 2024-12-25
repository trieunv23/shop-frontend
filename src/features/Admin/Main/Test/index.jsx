import React, { useState } from "react";

const DragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", "Item 3", , "Item 3", , "Item 3", , "Item 3"]); // Danh sách các mục

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggedItem === index) return;

    const updatedItems = [...items];
    const dragged = updatedItems[draggedItem];

    updatedItems.splice(draggedItem, 1);
    updatedItems.splice(index, 0, dragged);

    setItems(updatedItems);
    setDraggedItem(null);
  };

  return (
    <div>
      <h3>Kéo thả phần tử</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              padding: "10px",
              margin: "20px",
              border: "1px solid #ccc",
              backgroundColor: "lightblue",
              cursor: "move",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragAndDrop;
