import React from 'react';

const ResetPlayer = props =>
  <div className="card border-warning mb-3" style={{maxWidth: 35 + "rem"}}>
    <p className="lead">To revert the score of a player to 0, enter their player ID here.</p>
    <form onSubmit={props.handleSubmit}>
      <input className="form-control-sm" type="number" placeholder="Player ID"/><br/>
      <input className = "btn btn-warning" type="submit" value="Delete Score Information" />
    </form>
  </div>

  export default ResetPlayer;
