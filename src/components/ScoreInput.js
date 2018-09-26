import React from 'react';

const ScoreInput = props =>
  <div className="card border-warning mb-3" style={{maxWidth: 35 + "rem"}}>
    <p className="lead">To add scores to the board, input the unique player ID for a new or existing player and their latest score. </p>
    <form onSubmit={props.handleSubmit}>
      <input className="form-control-sm" type="number" name="player-id" placeholder="Player ID"/>
      <input className="form-control-sm" type="number" name="score" placeholder="Latest Score"/><br/><br/>
      <input className = "btn btn-warning" type="submit" value="Submit Score" />
    </form><br/>

    {props.playerID ? < DisplayPlayerAverage playerID={props.playerID} average={props.average} /> : null}

  </div>

  const DisplayPlayerAverage = props =>

  <div className="player-average">
  <p>Currently, player #{props.playerID} has an average score of {props.average} </p>
  </div>

export default ScoreInput;
