import { useState } from 'react';

/**
 * GoalInput component for adding new goals.
 * @param {object} props - Component props.
 * @param {function(string): void} props.onAddGoal - Callback function to add a new goal.
 */
function GoalInput({ onAddGoal }) {
  const [input, setInput] = useState(''); // State to hold the current input value

  /**
   * Handles the form submission.
   * Prevents default form behavior, adds the goal if input is not empty, and clears the input.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!input.trim()) return; // Do not add empty or whitespace-only goals

    onAddGoal(input.trim()); // Call the parent function to add the goal
    setInput(''); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        placeholder="Enter your goal..."
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update state as user types
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalInput;


