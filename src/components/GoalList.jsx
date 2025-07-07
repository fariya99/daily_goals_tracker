import GoalItem from './GoalItem';

/**
 * GoalList component to display a list of goals.
 * @param {object} props - Component props.
 * @param {Array<object>} props.goals - An array of goal objects.
 * @param {function(number): void} props.onDelete - Callback to delete a goal.
 * @param {function(number): void} props.onToggleComplete - Callback to toggle goal completion.
 * @param {function(number, object): void} props.onEdit - Callback to edit a goal's text or due date.
 */
function GoalList({ goals, onDelete, onToggleComplete, onEdit }) {
  // If there are no goals, this component returns null,
  // and the "No goals yet!" message is handled in the parent App.jsx.
  if (goals.length === 0) {
    return null;
  }

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id} // Unique key for each list item, important for React rendering
          goal={goal}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default GoalList;
