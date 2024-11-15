import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './Board.css';

export default function Board({ clients }) {
  const columns = {
    backlog: { title: "Backlog", items: clients.backlog },
    inProgress: { title: "In Progress", items: clients.inProgress },
    complete: { title: "Complete", items: clients.complete }
  };

  return (
    <div className="board">
      {Object.entries(columns).map(([columnId, column]) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="column"
            >
              <h2>{column.title}</h2>
              {column.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card id={item.id} name={item.name} description={item.description} status={item.status} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
}
