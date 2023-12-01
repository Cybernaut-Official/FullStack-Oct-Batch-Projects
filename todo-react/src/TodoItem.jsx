import propTypes from "prop-types";

const TodoItem = ({ todo }) => {
  return <li>{todo}</li>;
};

TodoItem.propTypes = {
  todo: propTypes.string.isRequired,
};

export default TodoItem;
