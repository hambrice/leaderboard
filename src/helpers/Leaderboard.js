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

export default Leaderboard;

// describe('Leaderboard', function() {
//
//   const leaderboard = new Leaderboard;
//
//   it('starts with an empty player list', () => {
//
//     expect(leaderboard.players).toEqual({});
//
//   });
//
//   describe('addScore', function() {
//
//     it('adds a new player and their score', () => {
//
//       expect(leaderboard.addScore(1, 100)).toEqual(100);
//        expect(leaderboard.addScore(2, 80)).toEqual(80);
//        expect(leaderboard.addScore(3, 72)).toEqual(72);
//
//     });
//
//     it('returns a new average score if a player already exists', () => {
//
//       expect(leaderboard.addScore(2, 70)).toEqual(75);
//       expect(leaderboard.addScore(2, 60)).toEqual(70);
//
//     });
//
//   })
//
//   describe('_sort', function() {
//
//     const player = {player_id: 1, scores: 2, totalScore: 200, before: null, next: null}
//     const nextNormalPlayer = {player_id: 2, scores: 2, totalScore: 180, before: 3, next: 4}
//     const currentLastPlayer = {player_id: 2, scores: 2, totalScore: 260, before: 3, next: null}
//     const currentLeadPlayer = {player_id: 2, scores: 2, totalScore: 180, before: null, next: 3}
//
//     it('sets a player in a higher rank of the nextPlayer', () => {
//
//       expect(leaderboard._sort(player, nextNormalPlayer)).toEqual([{player_id: 1, scores: 2, totalScore: 200, before: 3, next: 2}, {player_id: 2, scores: 2, totalScore: 180, before: 1, next: 4} ])
//
//     })
//
//     it('handles if the next player is last ranked', () => {
//
//       expect(leaderboard._sort(player, currentLastPlayer)).toEqual([{player_id: 1, scores: 2, totalScore: 200, before: 3, next: 2}, {player_id: 2, scores: 2, totalScore: 260, before: 1, next: null} ])
//
//     })
//
//     it('handles if the player should be first', () => {
//
//       expect(leaderboard._sort(player, currentLeadPlayer)).toEqual([{player_id: 1, scores: 2, totalScore: 200, before: null, next: 2}, {player_id: 2, scores: 2, totalScore: 180, before: 1, next: 3} ])
//
//     })
//
//   })
//
//   describe('_sortLast', function() {
//
//     const player = {player_id: 1, scores: 2, totalScore: 200, before: null, next: null}
//     const currentLastPlayer = {player_id: 2, scores: 2, totalScore: 260, before: 3, next: null}
//
//     it('handles if the current player should be last', () => {
//
//       expect(leaderboard._sortLast(player, currentLastPlayer)).toEqual([{player_id: 1, scores: 2, totalScore: 200, before: 2, next: null}, {player_id: 2, scores: 2, totalScore: 260, before: 3, next: 1} ])
//
//     })
//
//   })
//
//   describe('_handleOrder', function() {
//
//     const leaderboard2 = new Leaderboard
//     leaderboard2.players = {
//       1 : {player_id: 1, scores: 2, totalScore: 220, before: 2, next: 3},
//       2 : {player_id: 2, scores: 2, totalScore: 240, before: null, next: 1},
//       3 : {player_id: 3, scores: 2, totalScore: 180, before: 1, next: null}
//     }
//
//     leaderboard2.leadPlayer = {player_id: 2, scores: 2, totalScore: 240, before: null, next: 1}
//
//     const player2 = {player_id: 4, scores: 2, totalScore: 200, before: null, next: null}
//
//     beforeEach(function() {
//       leaderboard2._handleOrder(player2, leaderboard2.players[2])
//     })
//
//     it('places a new player in the proper location', () => {
//
//       expect(leaderboard2.players).toEqual({
//
//       1 : {player_id: 1, scores: 2, totalScore: 220, before: 2, next: 4},
//       2 : {player_id: 2, scores: 2, totalScore: 240, before: null, next: 1},
//       3 : {player_id: 3, scores: 2, totalScore: 180, before: 4, next: null}
//
//     })
//
//       expect(player2).toEqual({player_id: 4, scores: 2, totalScore: 200, before: 1, next: 3})
//
//     })
//
//   })
//
//   describe('top', function() {
//
//     const leaderboard3 = new Leaderboard;
//
//     beforeEach(function() {
//
//       leaderboard3.addScore(1, 50);
//       leaderboard3.addScore(3, 70);
//       leaderboard3.addScore(2, 60);
//
//     })
//
//     it('returns the top ranked players', () => {
//
//       expect(leaderboard3.top(3)).toEqual([3, 2, 1])
//
//     })
//
//   })
//
// });
