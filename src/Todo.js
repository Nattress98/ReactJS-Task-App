import React, { useState, useRef } from "react";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentList from "./CommentList";

export default function Todo({ todo, toggleTodo, addTodoComment }) {
  const [commenting, setCommenting] = useState(false);
  const commentBoxRef = useRef();
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleCommentClicked() {
    setCommenting(!commenting);
  }
  function submitComment() {
    const comment = commentBoxRef.current.value;
    if (comment === "") return;
    commentBoxRef.current.value = null;
    setCommenting(!commenting);
    addTodoComment(todo.id, comment);
  }
  return (
    <div>
      <div className="Task">
        <label>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleTodoClick}
          />
          <h3>{todo.name}</h3>
          <ul>
            <CommentList comments={todo.comments} />
          </ul>
          {console.log(todo.comments)}
        </label>
        <button className="CommentButton" onClick={handleCommentClicked}>
          <FontAwesomeIcon icon={faComment} color={"white"} />
        </button>
      </div>
      {commenting ? (
        <div className="CommentBox">
          <textarea ref={commentBoxRef} placeholder="commenting..."></textarea>
          <button onClick={submitComment}>Submit</button>{" "}
        </div>
      ) : null}
    </div>
  );
}
