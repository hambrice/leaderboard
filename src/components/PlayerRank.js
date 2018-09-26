import React from 'react';


const RankInput = props =>
  <div className="rank-input panel">
    <p>To see the current rankings of this board, select how far down in the rankings you would like to see. </p>
    <form onSubmit={props.handleSubmit}>
      <input type="number" placeholder="Length of Rankings"/><br/>
      <input type="submit" />
    </form>
    {props.rankings ? <PlayerRank rankings={props.rankings} /> : null}
  </div>

const PlayerRank = props =>
<ol>
{props.rankings.map((player,key) =>
<li key={key}> {player} </li>)}
</ol>



  export default RankInput
