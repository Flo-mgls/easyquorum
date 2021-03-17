<template>
  <div>
    <div v-for="resolution in resolutions" :key="resolution.id">
      <h2>{{ resolution.title }}</h2>
      <tr v-for="college in colleges" :key="college.id">
        <td>{{ college.name }}</td>
        <td v-for="vote in giveFor(resolution.id, college.id)" :key="vote.id">
          {{ vote }}
        </td>
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
    giveFor(resolutionId, collegeId) {
      let membersOfThisCollege = this.members.filter(
        (m) => m.collegeId === collegeId
      );

      let membersIdOfThisCollege = [];
      membersOfThisCollege.forEach(function (m) {
        membersIdOfThisCollege.push(m.id);
      });

      let votesForThisReso = this.votes.filter(
        (v) => v.resolutionId === resolutionId
      );

      let votesForThisCollege = [];
      votesForThisReso.forEach(function (v) {
        if (membersIdOfThisCollege.includes(v.memberId)) {
          votesForThisCollege.push(v);
        }
      });

      let votesResults = { agree: 0, disagree: 0, none: 0 };
      votesForThisCollege.forEach(function (v) {
        if (v.vote) {
          votesResults.agree += 1;
        } else if (v.vote === null) {
          votesResults.none += 1;
        } else {
          votesResults.disagree += 1;
        }
      });
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
