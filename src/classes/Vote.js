// CLASSE VOTE

export default class Vote {
    constructor(id, resolutionId, memberId, vote) {
        this.id = id;
        this.resolutionId = resolutionId;
        this.memberId = memberId;
        this.vote = vote
    }
}