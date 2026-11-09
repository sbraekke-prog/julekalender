/**
 * INNHOLD TIL JULEKALENDEREN FOR KIRAN ("SNUPPELUPP")
 * ====================================================
 * Her kan du enkelt endre tekstene og bildene for hver enkelt dag (1 til 24).
 *
 * Slik bytter du bilder:
 * Legg dine egne bilder i mappen "images/" og kall dem "1.jpg", "2.jpg", osv.
 * (Du kan også endre filnavnet under hvis et bilde heter f.eks. "images/1.png" eller "images/oss.jpeg").
 * Hvis en bildefil ikke finnes i "images/"-mappen ennå, vises automatisk en koselig jule-illustrasjon!
 */

const CALENDAR_CONFIG = {
  recipientName: "Kiran Gjetrang",
  recipientNickname: "Snuppelupp",
  title: "Julekalender til Snuppelupp",
  subtitle: "24 små glimt av hvorfor jeg er så glad i deg, Kiran ❤️"
};

const CALENDAR_DOORS = [
  {
    day: 1,
    title: "1. desember – Endelig desember!",
    text: "God 1. desember, Snuppelupp! ❤️ Nå starter nedtellingen til jul, og jeg ville lage noe helt eget til deg. Hver dag frem til julaften får du en liten påminnelse om hvor fantastisk du er – og hvor heldig jeg er som får dele hverdagen med akkurat deg.",
    image: "images/1.jpg",
    imageAlt: "Oss to ved starten av desember"
  },
  {
    day: 2,
    title: "2. desember – Smilet ditt",
    text: "Visste du at smilet ditt faktisk har superkrefter? Uansett hvor trøtt jeg er eller hvor grå dagen har vært, så snur humøret mitt i det sekundet du smiler til meg. Takk for at du lyser opp hverdagen min, Kiran!",
    image: "images/2.jpg",
    imageAlt: "Et fint øyeblikk med verdens beste smil"
  },
  {
    day: 3,
    title: "3. desember – Vår egen lille boble",
    text: "Noe av det beste jeg vet med oss er at vi kan ha det like gøy på en helt vanlig tirsdag i sofaen som når vi finner på noe stort sammen. Med deg føles selv de mest hverdagslige tingene som et lite eventyr.",
    image: "images/3.jpg",
    imageAlt: "Hverdagskos i vår egen boble"
  },
  {
    day: 4,
    title: "4. desember – En offisiell tilståelse",
    text: "La oss være ærlige et øyeblikk: Da jeg møtte deg, skjønte jeg fort at jeg hadde skutt gullfuglen. Du er smart, morsom, nydelig – og akkurat passe rar på samme måte som meg. Perfekt match!",
    image: "images/4.jpg",
    imageAlt: "Blinkskudd av oss"
  },
  {
    day: 5,
    title: "5. desember – Varmekilden min",
    text: "Det begynner å bli skikkelig kaldt ute, men det gjør ingenting så lenge jeg har min egen personlige varmekilde (og tidenes beste klemmer) hjemme.Gleder meg allerede til neste klem, Snuppelupp!",
    image: "images/5.jpg",
    imageAlt: "Vinterstemning og gode klemmer"
  },
  {
    day: 6,
    title: "6. desember – Lattergaranti",
    text: "Takk for alle gangene vi ler så vi nesten mister pusten av ting absolutt ingen andre hadde skjønt. Våre interne greier og tullete samtaler er noe av det jeg setter aller mest pris på i hele verden.",
    image: "images/6.jpg",
    imageAlt: "Et morsomt minne sammen"
  },
  {
    day: 7,
    title: "7. desember – Du gjør meg bedre",
    text: "Du inspirerer meg hver eneste dag, Kiran. Måten du bryr deg om de rundt deg på, og innsatsen du legger i alt du gjør, gjør meg både stolt og ydmyk. Du gjør meg rett og slett til en bedre utgave av meg selv.",
    image: "images/7.jpg",
    imageAlt: "Stolt av deg, Kiran"
  },
  {
    day: 8,
    title: "8. desember – Mat & Kjærlighet",
    text: "Sies det ikke at veien til hjertet går gjennom magen? Med deg er det enda bedre: Alt smaker bedre når vi spiser sammen (selv når vi bruker en halvtime på å bli enige om hva vi faktisk har lyst på til middag).",
    image: "images/8.jpg",
    imageAlt: "Matkos eller date-night"
  },
  {
    day: 9,
    title: "9. desember – Mitt tryggeste sted",
    text: "«Hjem» er ikke lenger bare et sted eller en adresse for meg – det er der du er. Takk for at du alltid får meg til å føle meg så trygg, sett og elsket, Snuppelupp.",
    image: "images/9.jpg",
    imageAlt: "Der du er, er hjemme"
  },
  {
    day: 10,
    title: "10. desember – Litt kjærestestatistikk",
    text: "Etter grundige vitenskapelige beregninger har jeg kommet frem til følgende: 1) Du er 100 % nydelig. 2) Jeg tenker på deg altfor mange ganger om dagen. 3) Vi to er tidenes beste lag.",
    image: "images/10.jpg",
    imageAlt: "Tidenes beste lag"
  },
  {
    day: 11,
    title: "11. desember – Favorittminner",
    text: "Når jeg ser tilbake på alt vi har opplevd sammen så langt, blir jeg så varm om hjertet. Og det aller fineste? At vi bare så vidt har begynt på alle minnene vi skal skape sammen.",
    image: "images/11.jpg",
    imageAlt: "Et av våre beste minner"
  },
  {
    day: 12,
    title: "12. desember – Halvveis til julaften!",
    text: "Tenk at vi allerede er halvveis til jul! Midt i alt julestresset håper jeg du husker å puste med magen og nyte desember. I kveld synes jeg vi fortjener litt ekstra kos bare for oss to ❤️",
    image: "images/12.jpg",
    imageAlt: "Halvveis til jul"
  },
  {
    day: 13,
    title: "13. desember – Lucia-dagen ✨",
    text: "I dag er det Lucia, dagen for lys i mørketiden. For meg er det du som er selve lyset i vintermørket, Kiran. Du sprer så mye varme og glede bare ved å være deg selv.",
    image: "images/13.jpg",
    imageAlt: "Lyspunktet i mørketiden"
  },
  {
    day: 14,
    title: "14. desember – Små ting jeg elsker ved deg",
    text: "Jeg elsker blikket ditt når du blir engasjert, lyden av latteren din, måten du ser på meg på, og hvor omsorgsfull du er. Det er summen av alle de tusen små tingene som gjør at jeg elsker deg høyere for hver dag.",
    image: "images/14.jpg",
    imageAlt: "Alle de små øyeblikkene"
  },
  {
    day: 15,
    title: "15. desember – Tålmodighetsprisen 🏆",
    text: "Dagens luke inneholder en høytidelig utmerkelse til Snuppelupp for eksemplarisk tålmodighet med kjæresten sin! Takk for at du holder ut med alle påfunnene mine (og fremdeles smiler!).",
    image: "images/15.jpg",
    imageAlt: "Verdens mest tålmodige kjæreste"
  },
  {
    day: 16,
    title: "16. desember – Drømmer for fremtiden",
    text: "Hver gang jeg tenker på fremtiden – reiser vi skal på, opplevelser vi skal dele og hverdager som venter – så smiler jeg, fordi du er med i alle planene mine.",
    image: "images/16.jpg",
    imageAlt: "På vei mot nye eventyr sammen"
  },
  {
    day: 17,
    title: "17. desember – En liten påminnelse",
    text: "Husk dette i dag, Kiran: Du er mer enn god nok akkurat som du er. Du er sterkere enn du tror, vakrere enn du aner, og høyere elsket enn jeg noen gang klarer å beskrive med ord.",
    image: "images/17.jpg",
    imageAlt: "Vakre Kiran"
  },
  {
    day: 18,
    title: "18. desember – Sofa-mesterskapet",
    text: "Ingen slår oss i disiplinen «armkrok, teppe og julefilm». La oss snart sette av en hel kveld uten planer, med bare favorittsnacks og deg helt inntil meg.",
    image: "images/18.jpg",
    imageAlt: "Armkrok og julekos"
  },
  {
    day: 19,
    title: "19. desember – Bestevenn og kjæreste",
    text: "Det beste med å være sammen med deg er at du ikke bare er kjæresten min, men også min aller beste venn. Du er alltid den første jeg vil fortelle gode nyheter til, og den eneste jeg vil søke trøst hos.",
    image: "images/19.jpg",
    imageAlt: "Bestevenner og kjærester"
  },
  {
    day: 20,
    title: "20. desember – 4 dager igjen!",
    text: "Nå lukter det snart jul i hver krik og krok! Uansett hva som ligger under juletreet i år, så har jeg allerede fått alt jeg ønsker meg i deg, Snuppelupp.",
    image: "images/20.jpg",
    imageAlt: "Snart jul!"
  },
  {
    day: 21,
    title: "21. desember – Vintersolverv ❄️",
    text: "I dag er årets mørkeste dag, og fra i morgen går vi endelig mot lysere tider igjen. Takk for at du gjør hver eneste årstid så fin å leve i sammen med deg.",
    image: "images/21.jpg",
    imageAlt: "Mot lysere tider sammen"
  },
  {
    day: 22,
    title: "22. desember – Øyeblikkene jeg samler på",
    text: "Jeg samler på øyeblikk med deg. Alt fra store merkedager til det trøtte morgentrynet ditt med kaffekoppen i hånda. Hvert eneste ett av dem er gull verdt for meg.",
    image: "images/22.jpg",
    imageAlt: "Øyeblikk verdt å samle på"
  },
  {
    day: 23,
    title: "23. desember – Lille julaften 🎄",
    text: "Lille julaften er her! Nå senker julefreden seg, og jeg kjenner på en enorm takknemlighet for året som har gått med deg ved min side. Gleder meg til i morgen, kjære!",
    image: "images/23.jpg",
    imageAlt: "Lille julaften-stemning"
  },
  {
    day: 24,
    title: "24. desember – God jul, elskede Kiran! ❤️",
    text: "God jul, Snuppelupp! ❤️ Takk for alt du er og alt vi har sammen. Du er mitt fineste juleeventyr, i dag og alle andre dager i året. Jeg elsker deg uendelig høyt!",
    image: "images/24.jpg",
    imageAlt: "God jul, Kiran og meg"
  }
];
