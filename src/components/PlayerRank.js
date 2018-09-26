import React from 'react';


const RankInput = props =>
  <div className="card border-warning mb-3" style={{maxWidth: 35 + "rem"}}>
    <p className="lead">To see the current rankings of this board, select how far down in the rankings you would like to see. </p>
    <form onSubmit={props.handleSubmit}>
      <input className="form-control-sm" type="number" placeholder="Length of Rankings"/><br/>
      <input className = "btn btn-warning" type="submit" />
    </form>
    {props.rankings ? <PlayerRank rankings={props.rankings} /> : null}
  </div>

const PlayerRank = props =>
<ol>
{props.rankings.map((player,key) =>
<li key={key}> {player} </li>)}
</ol>



  export default RankInput
