import College from '../classes/College.js'

// ON CREE NOS DONNEES A PARTIR DE LA CLASSE QU'ON ENVOI DANS MAIN.JS
const College1 = new College(442, "College A");
const College2 = new College(443, "College B");
const College3 = new College(444, "College C");

export const collegesList = [College1, College2, College3];
