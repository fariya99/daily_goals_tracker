import { useState, useEffect } from 'react';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import './App.css'; // Importing App-specific styles

function App() {
  // State to hold the list of goals.
  // Initializes from localStorage on first render, otherwise an empty array.
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all'); // State for filtering goals (all, active, completed)

  // useEffect hook to persist goals to localStorage whenever the 'goals' state changes.
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]); // Dependency array ensures this effect runs only when 'goals' changes

  /**
   * Adds a new goal to the list.
   * @param {string} text - The text content of the new goal.
   */
  const addGoal = (text) => {
    const newGoal = {
      id: Date.now(), // Simple unique ID generation
      text,
      completed: false,
      dueDate: null, // Initialize dueDate as null
    };
    setGoals((prev) => [...prev, newGoal]); // Add new goal to the existing array
  };

  /**
   * Deletes a goal from the list based on its ID.
   * @param {number} id - The ID of the goal to delete.
   */
  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id)); // Filter out the goal to be deleted
  };

  /**
   * Toggles the 'completed' status of a goal.
   * @param {number} id - The ID of the goal to toggle.
   */
  const toggleComplete = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal // Toggle completed status
      )
    );
  };

  /**
   * Edits the text and/or due date of an existing goal.
   * @param {number} id - The ID of the goal to edit.
   * @param {object} updatedFields - An object containing fields to update (e.g., { text: 'New Text', dueDate: '2025-12-31T...' }).
   */
  const editGoal = (id, updatedFields) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, ...updatedFields } : goal // Merge updated fields into the goal
      )
    );
  };

  /**
   * Clears all goals from the list after user confirmation.
   * NOTE: In a production app, you'd use a custom modal instead of native `confirm()`.
   */
  const clearGoals = () => {
    if (confirm('Are you sure you want to delete all goals? This action cannot be undone.')) {
      setGoals([]); // Clear all goals
    }
  };

  // Filtered goals based on the current filter state
  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') {
      return !goal.completed;
    } else if (filter === 'completed') {
      return goal.completed;
    }
    return true; // 'all' filter
  });

  // Calculate summary statistics
  const total = goals.length;
  const completed = goals.filter((g) => g.completed).length;
  const pending = total - completed;

  return (
    <div className="app">
      {/* Main heading with an emoji for visual appeal */}
      <h1><span role="img" aria-label="Target">🎯</span> My Goals Tracker</h1>

      {/* Goal input component */}
      <GoalInput onAddGoal={addGoal} />

      {/* Summary section displaying goal counts */}
      <div className="summary">
        <span>Total: {total}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Goals
        </button>
        <button
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Goal list component, passing necessary props for actions */}
      <GoalList
        goals={filteredGoals}
        onDelete={deleteGoal}
        onToggleComplete={toggleComplete}
        onEdit={editGoal}
      />

      {/* Clear All button, only visible if there are goals */}
      {total > 0 && (
        <button className="clear-btn" onClick={clearGoals}>
          Clear All Goals
        </button>
      )}

      {/* Message displayed when there are no goals */}
      {total === 0 && <p className="no-goals-message">You have no goals yet! Time to set some new ones. ✨</p>}
    </div>
  );
}

export default App;
