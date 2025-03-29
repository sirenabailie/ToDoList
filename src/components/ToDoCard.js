import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form } from 'react-bootstrap';
import { deleteTodo, updateTodo } from '../api/ToDo';

export default function TodoCard({ todoObj, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState(todoObj.description);

  const deleteThisTodo = () => {
    if (window.confirm(`Delete "${todoObj.description}"?`)) {
      deleteTodo(todoObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleClick = () => {
    const updatedTodo = { ...todoObj, isComplete: !todoObj.isComplete };
    updateTodo(updatedTodo).then(() => onUpdate());
  };

  const handleSave = () => {
    const updatedTodo = { ...todoObj, description: newDescription };
    updateTodo(updatedTodo).then(() => {
      setEditMode(false);
      onUpdate();
    });
  };

  return (
    <Card bg="Secondary" text="light" className="mb-2 task-card">
      <Card.Body className="card-body">
        {editMode ? <Form.Control type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="mb-2" /> : <Card.Title>{todoObj.description}</Card.Title>}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <Button variant={todoObj.isComplete ? 'success' : 'warning'} onClick={handleClick} style={{ flex: 1 }}>
            {todoObj.isComplete ? '✅ Complete' : '⬜ Incomplete'}
          </Button>
          {editMode ? (
            <>
              <Button variant="success" onClick={handleSave} style={{ flex: 1 }}>
                💾 Save
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)} style={{ flex: 1 }}>
                ❌ Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="info" onClick={() => setEditMode(true)} style={{ flex: 1 }}>
                📝 Edit
              </Button>
              <Button variant="danger" onClick={deleteThisTodo} style={{ flex: 1 }}>
                ✖ Delete
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

TodoCard.propTypes = {
  todoObj: PropTypes.shape({
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    isComplete: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
