<template>
  <div>
    <div v-for="resolution in resolutions" :key="resolution.id">
      <h2>{{ resolution.title }}</h2>
      <tr v-for="college in colleges" :key="college.id">
        <td>{{ college.name }}</td>
        <td v-for="vote in getVotesResultsOfThisCollege(resolution, college)" :key="vote.id">
          {{ vote.nbrVote }} ({{ vote.parts }}) -
        </td>
      </tr>
      <tr>
        <td v-if="resolution.approved === true">OKAY</td>
      </tr>
      <button v-on:click="check(resolution)">Check</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resolution",
  data: () => {
    return {
      resolutions: [],
      colleges: [],
      votes: [],
      members: [],
    };
  },
  methods: {
    getMembersOfCollege(college) {
      let membersOfThisCollege = this.members.filter(
        (m) => m.collegeId === college.id
      );
      return membersOfThisCollege;
    },
    getMembersIdOfCollege(membersOfThisCollege) {
      let membersIdOfThisCollege = [];
      membersOfThisCollege.forEach(function (m) {
        membersIdOfThisCollege.push(m.id);
      });
      return membersIdOfThisCollege;
    },
    getVotesOfResolution(resolution) {
      let votesForThisResolution = this.votes.filter(
        (v) => v.resolutionId === resolution.id
      );
      return votesForThisResolution;
    },
    getVotesByCollege(votesForThisResolution, membersIdOfThisCollege) {
      let votesByThisCollege = [];
      votesForThisResolution.forEach(function (v) {
        if (membersIdOfThisCollege.includes(v.memberId)) {
          votesByThisCollege.push(v);
        }
      });
      return votesByThisCollege;
    },
    getTotalPartsOfCollege(membersOfThisCollege) {
      let totalParts = 0;
      membersOfThisCollege.forEach(function (m) {
        totalParts += m.nbrParts;
      });
      return totalParts;
    },
    getVotesResultsOfCollege(
      votesByThisCollege,
      membersOfThisCollege,
      resolution,
      totalPartsOfThisCollege
    ) {
      let votesResultsOfThisCollege = [
        { nbrVote: 0, parts: 0 },
        { nbrVote: 0, parts: 0 },
        { nbrVote: 0, parts: 0 },
      ];

      votesByThisCollege.forEach(function (v) {
        let member = membersOfThisCollege.find((m) => m.id === v.memberId);
        if (v.vote) {
          votesResultsOfThisCollege[0].nbrVote += 1;
          votesResultsOfThisCollege[0].parts += member.nbrParts;
          resolution.agree.push(member.id);
        } else if (v.vote === null) {
          votesResultsOfThisCollege[2].nbrVote += 1;
          votesResultsOfThisCollege[2].parts += member.nbrParts;
          resolution.none.push(member.id);
        } else {
          votesResultsOfThisCollege[1].nbrVote += 1;
          votesResultsOfThisCollege[1].parts += member.nbrParts;
          resolution.disagree.push(member.id);
        }
      });

      votesResultsOfThisCollege.forEach(function (v) {
        v.parts =
          Math.round((v.parts / totalPartsOfThisCollege) * 100 * 100) / 100;
      });
      return votesResultsOfThisCollege;
    },
    checkIfResolutionIsApproved(votesResultsOfThisCollege, resolution) {
      if (
        votesResultsOfThisCollege[0].parts >= 50 &&
        resolution.approved != false
      ) {
        resolution.approved = true;
      } else {
        resolution.approved = false;
      }
    },
    getVotesResultsOfThisCollege(resolution, college) {
      let membersOfThisCollege = this.getMembersOfCollege(college);

      let membersIdOfThisCollege = this.getMembersIdOfCollege(
        membersOfThisCollege
      );

      let votesForThisResolution = this.getVotesOfResolution(resolution);

      let votesByThisCollege = this.getVotesByCollege(
        votesForThisResolution,
        membersIdOfThisCollege
      );

      let totalPartsOfThisCollege = this.getTotalPartsOfCollege(
        membersOfThisCollege
      );

      let votesResultsOfThisCollege = this.getVotesResultsOfCollege(
        votesByThisCollege,
        membersOfThisCollege,
        resolution,
        totalPartsOfThisCollege
      );

      this.checkIfResolutionIsApproved(votesResultsOfThisCollege, resolution);

      return votesResultsOfThisCollege;
    },
    check(resolution) {
      console.log(resolution.agree);
      console.log(resolution.disagree);
      console.log(resolution.none);
    },
  },
  mounted() {
    this.resolutions = this.$resolutionsList;
    this.$resolutionsList.forEach((resolution) => {
      resolution.approved = true;
      resolution.agree = [];
      resolution.disagree = [];
      resolution.none = [];
    });
    this.colleges = this.$collegesList;
    this.votes = this.$votesList;
    this.members = this.$membersList;
  },
};
</script>

<style scoped lang="scss">
</style>
