class Leaderboard {

  constructor() {

    this.players = {};
    this.leadPlayer = null;

  }

  addScore(player_id, score) {

        let player_score;
        let player = this.players[player_id]

    // if the player doesn't already exist, create it and return the original score as its average
    if (!player) {

      player = this.players[player_id] = {player_id: player_id, scores: 1, totalScore: score, before: null, next: null}
      player_score = score

    //if the player already exists, increase it's amount of scores and totalScore and return the average of its scores
    } else {

      player.scores += 1
      player.totalScore += score
      player_score = this._averageScore(player)

    }

    //check to see if the new score added has altered the rankings
    this._handleOrder(player, this.leadPlayer)
    return player_score

  }

  _averageScore(player) {

    let { scores, totalScore } = player;
    return totalScore / scores;

  }

  top(int) {

    //start with the leadPlayer
    let currentPlayer = this.leadPlayer;
    let currentRanking = [];

    //add the current player's id to the empty array in order and then move to the next player until it's reached the size of the input
    for(let i=0; i < int; i++) {

      currentRanking.push(currentPlayer.player_id)
      currentPlayer = this.players[currentPlayer.next]

    }

    return currentRanking;

  }

  _handleOrder(currentPlayer, nextPlayer) {

    console.log(this.players)
    //if this is the first player, make it the leadPlayer and terminate
    if (!this.leadPlayer) {

      this.leadPlayer = currentPlayer;
      return;

    }

  //if currentPlayer has a higher average than the nextPlayer, figure out if changes need to be made
    if (this._averageScore(currentPlayer) >= this._averageScore(nextPlayer)) {

      //if the currentPlayer is already ranked before the nextPlayer, terminate
      if (!this._shouldSort) {

        return;

      //if not, make the currentPlayer ranked before the nextPlayer
      } else {

        this._sort(currentPlayer, nextPlayer)

      }

    //if the currentPlayer does not have a higher average score and nextPlayer isn't last, _checkOrder with the next player in the ranking
    } else if (nextPlayer.next) {

     this._handleOrder(currentPlayer, this.players[nextPlayer.next])

    //if the nextPlayer is last, make the currentPlayer the new last
    } else {

      this._sortLast(currentPlayer, nextPlayer)

    }

  }

  _shouldSort(currentPlayer, nextPlayer) {
    if (nextPlayer.before === currentPlayer.player_id) {
      return true
    } else {
      return false
    }
  }


  _sort(currentPlayer, otherPlayer) {

    //if otherPlayer is the current last, make currentPlayer the new last
    if(!otherPlayer.before) {

      currentPlayer.before = null;
      currentPlayer.next = otherPlayer.player_id
      otherPlayer.before = currentPlayer.player_id
      this.leadPlayer = currentPlayer;

    //otherwise, place currentPlayer above the otherPlayer and after the otherPlayer's current before
    } else {

      this.players[otherPlayer.before].next = currentPlayer.player_id
      currentPlayer.before = otherPlayer.before
      currentPlayer.next = otherPlayer.player_id
      otherPlayer.before = currentPlayer.player_id
    }

    return [currentPlayer, otherPlayer]
  }

  _sortLast(currentPlayer, lastPlayer) {

      currentPlayer.next = null;
      currentPlayer.before = lastPlayer.player_id
      lastPlayer.next = currentPlayer.player_id
      return [currentPlayer, lastPlayer]

  }


}
