<template>
  <div class="container mb-5">
    <!-- RESOLUTION -->
    <section
      class="mt-5"
      v-for="resolution in resolutions"
      :key="resolution.id"
    >
      <!-- Résolution titre et détails -->
      <div class="p-2 shadow border border-2 rounded">
        <h2 class="mb-0 fw-bold">
          {{ resolution.title }}
        </h2>
        <p class="mb-0">{{ resolution.details }}</p>
      </div>
      <!-- FIN Résolution titre et détails -->

      <!-- TABLEAU DES VOTES -->
      <table class="m-auto mt-5 p-2 shadow border border-2 rounded">
        <!-- Titre type -->
        <tr>
          <td class="border p-2 h5"></td>
          <td class="border p-2 h5 fw-bold">FAVORABLE</td>
          <td class="border p-2 h5 fw-bold">DEFAVORABLE</td>
          <td class="border p-2 h5 fw-bold">ABSTENTION</td>
        </tr>
        <!-- FIN Titre type -->

        <tr v-for="college in colleges" :key="college.id">
          <!-- Titre collège -->
          <td class="border p-2 h5 fw-bold">{{ college.name }}</td>
          <!-- FIN Titre collège -->

          <!-- Résultats votes -->
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
          <!-- FIN Résultats votes -->
        </tr>

        <!-- Résultat final -->
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
        <!-- FIN Résultat final -->
      </table>
      <!-- FIN TABLEAU DES VOTES -->

      <!-- Icone résultat final -->
      <i
        class="fas fa-3x fa-check-circle approved"
        v-if="resolution.approved === true"
      ></i>
      <i class="fas fa-3x fa-times-circle notApproved" v-else></i>
      <!-- FIN Icone résultat final -->

      <!-- Bouton + d'infos -->
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
      <!-- FIN Bouton + d'infos -->

      <div class="row">
        <!-- Personnes ayant approuvées -->
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
        <!-- FIN Personnes ayant approuvé -->

        <!-- Personnes n'ayant pas voté -->
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
        <!-- FIN Personnes n'ayant pas voté -->

        <!-- Personnes ayant rejeté -->
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
      <!-- FIN Personnes ayant rejeté -->
    </section>
    <!-- FIN RESOLUTION -->
  </div>
</template>

<script>
export default {
  name: "Resolution",
  data: () => {
    return {
      resolutions: [], // Array avec toutes les résolutions
      colleges: [], // Array avec tous les collèges
      votes: [], // Array avec tous les votes
      members: [], // Array avec tous les membres
    };
  },
  methods: {
    getMembersOfCollege(college) {
      // Renvoie les membres du collège actuel
      let membersOfThisCollege = this.members.filter(
        (m) => m.collegeId === college.id
      );
      return membersOfThisCollege;
    },
    getMembersIdOfCollege(membersOfThisCollege) {
      // Renvoie les ID des membres du collège actuel
      let membersIdOfThisCollege = [];
      membersOfThisCollege.forEach(function (m) {
        membersIdOfThisCollege.push(m.id);
      });
      return membersIdOfThisCollege;
    },
    getVotesOfResolution(resolution) {
      // Renvoie les votes de la résolution actuelle
      let votesForThisResolution = this.votes.filter(
        (v) => v.resolutionId === resolution.id
      );
      return votesForThisResolution;
    },
    getVotesByCollege(votesForThisResolution, membersIdOfThisCollege) {
      // Renvoie les votes pour le collège actuel
      let votesByThisCollege = [];
      votesForThisResolution.forEach(function (v) {
        if (membersIdOfThisCollege.includes(v.memberId)) {
          votesByThisCollege.push(v);
        }
      });
      return votesByThisCollege;
    },
    getTotalPartsOfCollege(membersOfThisCollege) {
      // Renvoie le total des parts des membres du collège actuel
      let totalParts = 0;
      membersOfThisCollege.forEach(function (m) {
        totalParts += m.nbrParts;
      });
      return totalParts;
    },
    getVotesResultsOfCollege( // Renvoie un tableau comportant les votes et leur part
      votesByThisCollege,
      membersOfThisCollege,
      resolution,
      totalPartsOfThisCollege
    ) {
      let votesResultsOfThisCollege = [
        { nbrVote: 0, parts: 0 }, // Vote pour
        { nbrVote: 0, parts: 0 }, // Vote contre
        { nbrVote: 0, parts: 0 }, // Abstention
      ];

      votesByThisCollege.forEach(function (v) {
        // Remplit le tableau des votes et push les membres en fonction de leur vote
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
        // Convertit les parts en pourcentage avec 2 décilames maximum
        v.parts =
          Math.round((v.parts / totalPartsOfThisCollege) * 100 * 100) / 100;
      });
      return votesResultsOfThisCollege;
    },
    checkIfResolutionIsApproved(votesResultsOfThisCollege, resolution) {
      // Vérifie si la résolution actuelle est approuvé ou non
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
      // Fonction principale qui sera appélée par le template
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
    // Attribut au data les données et crée les tableaux pour des choix des membres pour chaque résolution ainsi que son état
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