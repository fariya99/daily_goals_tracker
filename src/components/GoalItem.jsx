import { useState } from 'react';

/**
 * GoalItem component to display and manage a single goal.
 * @param {object} props - Component props.
 * @param {object} props.goal - The goal object (id, text, completed, dueDate).
 * @param {function(number): void} props.onDelete - Callback to delete this goal.
 * @param {function(number): void} props.onToggleComplete - Callback to toggle this goal's completion status.
 * @param {function(number, object): void} props.onEdit - Callback to edit a goal's text or due date.
 */
function GoalItem({ goal, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const [editedText, setEditedText] = useState(goal.text); // State to hold text during editing
  // State to hold due date during editing. Converts date to 'YYYY-MM-DD' format for input type="date".
  const [editedDueDate, setEditedDueDate] = useState(
    goal.dueDate ? new Date(goal.dueDate).toISOString().split('T')[0] : ''
  );

  /**
   * Handles saving the edited text and due date, or toggling edit mode.
   * This is triggered by the save button or Enter key.
   */
  const handleEdit = () => {
    // Only save if currently in editing mode
    if (isEditing) {
      if (editedText.trim()) {
        onEdit(goal.id, {
          text: editedText.trim(),
          dueDate: editedDueDate ? new Date(editedDueDate).toISOString() : null, // Save as ISO string or null
        });
      } else {
        // If text is empty, revert to original text instead of saving empty
        setEditedText(goal.text);
      }
    }
    // Toggle editing mode
    setIsEditing(!isEditing);
  };

  /**
   * Handles key presses during editing (e.g., Enter to save).
   * @param {KeyboardEvent} e - The keyboard event.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit(); // Save on Enter key press
    }
  };

  // Format due date for display
  const displayDueDate = goal.dueDate
    ? new Date(goal.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No due date';

  return (
    <li className={`goal-item ${goal.completed ? 'completed' : ''}`}>
      <div className="goal-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown} // Save on Enter
              autoFocus
              className="edit-goal-text-input"
            />
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              onKeyDown={handleKeyDown} // Save on Enter
              className="edit-due-date-input"
            />
          </>
        ) : (
          <>
            <span className="goal-text" onClick={() => onToggleComplete(goal.id)}>
              {goal.text}
            </span>
            <span className="goal-due-date">
              {displayDueDate}
            </span>
          </>
        )}
      </div>

      <div className="goal-actions">
        <button onClick={handleEdit} aria-label={isEditing ? 'Save edit' : 'Edit goal'}>
          {isEditing ? '✅' : '✏️'}
        </button>
        <button onClick={() => onDelete(goal.id)} aria-label="Delete goal">
          ❌
        </button>
      </div>
    </li>
  );
}

export default GoalItem;


