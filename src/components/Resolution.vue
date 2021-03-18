<template>
  <div>
    <div v-for="resolution in resolutions" :key="resolution.id">
      <h2>{{ resolution.title }}</h2>
      <tr v-for="college in colleges" :key="college.id">
        <td>{{ college.name }}</td>
        <td v-for="vote in giveFor(resolution, college)" :key="vote.id">
          {{ vote.nbrVote }} ({{ vote.parts }}) -
        </td>
      </tr>
      <tr>
        <td v-if="resolution.app === true">OKAY</td>
      </tr>
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
    giveFor(resolution, college) {
      let membersOfThisCollege = this.members.filter(
        (m) => m.collegeId === college.id
      );

      let membersIdOfThisCollege = [];
      membersOfThisCollege.forEach(function (m) {
        membersIdOfThisCollege.push(m.id);
      });

      let votesForThisReso = this.votes.filter(
        (v) => v.resolutionId === resolution.id
      );

      let votesForThisCollege = [];
      votesForThisReso.forEach(function (v) {
        if (membersIdOfThisCollege.includes(v.memberId)) {
          votesForThisCollege.push(v);
        }
      });

      let totalParts = 0;
      membersOfThisCollege.forEach(function (m) {
        totalParts += m.nbrParts;
      });

      let votesResults = [
        { nbrVote: 0, parts: 0 },
        { nbrVote: 0, parts: 0 },
        { nbrVote: 0, parts: 0 },
      ];

      votesForThisCollege.forEach(function (v) {
        let member = membersOfThisCollege.find((m) => m.id === v.memberId);
        if (v.vote) {
          votesResults[0].nbrVote += 1;
          votesResults[0].parts += member.nbrParts;
        } else if (v.vote === null) {
          votesResults[2].nbrVote += 1;
          votesResults[2].parts += member.nbrParts;
        } else {
          votesResults[1].nbrVote += 1;
          votesResults[1].parts += member.nbrParts;
        }
      });

      votesResults.forEach(function (v) {
        v.parts = Math.round((v.parts / totalParts) * 100 * 100) / 100;
      });

      if (votesResults[0].parts >= 50 && resolution.app != false) {
        resolution.app = true;
      } else {
        resolution.app = false;
      }



      return votesResults;
    },
  },
  mounted() {
    this.resolutions = this.$resolutionsList;
    this.colleges = this.$collegesList;
    this.votes = this.$votesList;
    this.members = this.$membersList;
  },
};
</script>

<style scoped lang="scss">
</style>
