import React from 'react';


const RankInput = props =>
  <div className="card border-warning mb-3" style={{maxWidth: 35 + "rem"}}>
    <p className="lead">To see the current rankings of this board, select how far down in the rankings you would like to see. </p>
    <form onSubmit={props.handleSubmit}>
      <input className="form-control-sm" type="number" placeholder="Length of Rankings"/><br/><br/>
      <input className = "btn btn-warning" type="submit" />
    </form><br/>
    {props.rankings ? <PlayerRank rankings={props.rankings} /> : null}
  </div>

const PlayerRank = props =>
<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Player Ranking</th>
      <th scope="col">Player ID</th>
    </tr>
  </thead>
  <tbody>

    {props.rankings.map((player, key) =>
    <tr key={key} className="table-light">
    <td> {key + 1} </td>
    <td> {player}</td>
    </tr>
  )}
  </tbody>
  </table>




  export default RankInput
