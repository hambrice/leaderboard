import React from 'react';

const ScoreInput = () =>
  <div className = "score-input">
    <h4>Input the unique player ID for a new or existing player and their latest score. </h4>
    Player ID
    <input type="number" name="player-id" />
    Latest Score
    <input type="number" name="score" />
    <input type="submit" value="Submit Score" />
  </div>

export default ScoreInput;
