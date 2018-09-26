import React from 'react';

const ScoreInput = props =>
  <div className = "score-input panel">
    <p>Input the unique player ID for a new or existing player and their latest score. </p>
    <form onSubmit={props.handleSubmit}>
      <input type="number" name="player-id" placeholder="Player ID"/>
      <input type="number" name="score" placeholder="Latest Score"/><br/>
      <input type="submit" value="Submit Score" />
    </form>

    {props.playerID ? < DisplayPlayerAverage playerID={props.playerID} average={props.average} /> : null}

  </div>

  const DisplayPlayerAverage = props =>

  <div className="player-average">
  <p>Currently, player number {props.playerID} has an average score of {props.average} </p>
  </div>

export default ScoreInput;
