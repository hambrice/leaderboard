import React from 'react';

const ResetPlayer = props =>
  <div className="card border-warning mb-3 form-group has-danger" style={{maxWidth: 35 + "rem"}}>
    <p className="lead">To revert the score of a player to 0, enter their player ID here.</p>
    <form className="form-group has-danger" onSubmit={props.handleSubmit}>
      <input className={`form-control-sm ${ props.inputValid }`} type="number" placeholder="Player ID" onChange={props.handleChange} id="inputInvalid"/><br/><br/>
      <div className="invalid-feedback">Sorry, that player ID does not currently exist.</div>
      <input id="resetSubmit" className ="btn btn-warning" type="submit" value="Delete Score Information" />
    </form>
  </div>



  export default ResetPlayer;
