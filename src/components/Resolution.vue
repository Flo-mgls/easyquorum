<template>
  <div class="container mb-5">
    <section
      class="mt-5"
      v-for="resolution in resolutions"
      :key="resolution.id"
    >
      <div class="p-2 shadow border border-2 rounded">
        <h2 class="mb-0 fw-bold">
          {{ resolution.title }}
        </h2>
        <p class="mb-0">{{ resolution.details }}</p>
      </div>
      <table class="m-auto mt-5 p-2 shadow border border-2 rounded">
        <tr>
          <td class="border p-2 h5"></td>
          <td class="border p-2 h5 fw-bold">FAVORABLE</td>
          <td class="border p-2 h5 fw-bold">DEFAVORABLE</td>
          <td class="border p-2 h5 fw-bold">ABSTENTION</td>
        </tr>
        <tr v-for="college in colleges" :key="college.id">
          <td class="border p-2 h5 fw-bold">{{ college.name }}</td>
          <td
            class="border p-2"
            v-for="vote in getVotesResultsOfThisCollege(resolution, college)"
            :key="vote.id"
          >
            <span class="fw-bold">{{ vote.nbrVote }}</span>
            <i class="fas fa-user"></i><br />
            (<span class="fw-bold">{{ vote.parts }}%</span>
            des parts)
          </td>
        </tr>
        <caption
          class="text-center approved"
          v-if="resolution.approved === true"
        >
          Résolution approuvée
        </caption>
        <caption
          class="text-center notApproved"
          v-if="resolution.approved !== true"
        >
          Résolution rejetée
        </caption>
      </table>
      <i
        class="fas fa-3x fa-check-circle approved"
        v-if="resolution.approved === true"
      ></i>
      <i class="fas fa-3x fa-times-circle notApproved" v-else></i>
      <p class="mt-3">
        <button
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".multi-collapse"
          aria-expanded="false"
          aria-controls="multiCollapseExample1 multiCollapseExample2 multiCollapseExample3"
        >
          + d'infos
        </button>
      </p>
      <div class="row">
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample1">
            <div class="card card-body shadowApproved">
              <h4 class="card-title fw-bold">Favorable</h4>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  v-for="member in resolution.agree"
                  :key="member.id"
                >
                  {{ member.firstName }} {{ member.name }}
                  <span v-if="member.companyName !== null"
                    >({{ member.companyName }})</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample2">
            <div class="card card-body shadow">
              <h4 class="card-title fw-bold">Abstention</h4>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  v-for="member in resolution.none"
                  :key="member.id"
                >
                  {{ member.firstName }} {{ member.name }}
                  <span v-if="member.companyName !== null"
                    >({{ member.companyName }})</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="collapse multi-collapse" id="multiCollapseExample3">
            <div class="card card-body shadowNotApproved">
              <h4 class="card-title fw-bold">Défavorable</h4>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  v-for="member in resolution.disagree"
                  :key="member.id"
                >
                  {{ member.firstName }} {{ member.name }}
                  <span v-if="member.companyName !== null"
                    >({{ member.companyName }})</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          resolution.agree.push(member);
        } else if (v.vote === null) {
          votesResultsOfThisCollege[2].nbrVote += 1;
          votesResultsOfThisCollege[2].parts += member.nbrParts;
          resolution.none.push(member);
        } else {
          votesResultsOfThisCollege[1].nbrVote += 1;
          votesResultsOfThisCollege[1].parts += member.nbrParts;
          resolution.disagree.push(member);
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

<style>
h2,
h4,
p,
li,
caption,
button,
tr {
  font-family: "Quicksand", sans-serif;
}
.approved {
  color: rgb(65, 140, 85);
}
.shadowApproved {
  box-shadow: 0 0.5rem 1rem rgba(65, 140, 85, 0.5);
}
.shadowNotApproved {
  box-shadow: 0 0.5rem 1rem rgba(161, 68, 66, 0.5);
}
.notApproved {
  color: rgb(161, 68, 66);
}
</style>
