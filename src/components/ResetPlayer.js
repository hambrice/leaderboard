import React from 'react';

const ResetPlayer = props =>
  <div className="reset-player">
    <h3>To revert the score of a player to 0, enter their player ID here.</h3>
    <form onSubmit={props.handleSubmit}>
      <input type="number" />
      <input type="submit" value="Delete Score Information" />
    </form>
  </div>

  export default ResetPlayer;
