import Member from '../classes/Member.js'

const member1 = new Member(501, "Diallo-Robin", "Charles", "Monsieur", null, 15.5, 442);
const member2 = new Member(502, "Leroux-Bertrand", "Marc", "Monsieur", "Société ABC", 5, 442);
const member3 = new Member(503, "Lemonnier", "Johanna", "Madame", null, 10, 442);
const member4 = new Member(504, "Pages", "Émilie", "Madame", null, 3, 443);
const member5 = new Member(505, "Deschamps", "Daniel-Richard", "Monsieur", null, 7, 443);
const member6 = new Member(506, "Barthelemy", "Victoire", "Madame", null, 4, 444);
const member7 = new Member(507, "Hamon", "Thierry", "Monsieur", null, 12, 444);

export const membersList = [member1, member2, member3, member4, member5, member6, member7];
