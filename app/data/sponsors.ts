import Sponsor from '@/Models/sponsors';

const PARTNERS = [
  new Sponsor(
    '/logo/google.svg',
    'partner',
    '',
    'Google',
    'Global technology powerhouse revolutionizing search, cloud computing, AI, and digital innovation for billions worldwide.',
    'https://www.facebook.com/Google/',
    'https://www.linkedin.com/company/google/'
  ),
  new Sponsor(
    '/logo/TidisTech.svg',
    'partner',
    '',
    'Tidis Tech',
    'Algerian telecommunications specialist delivering secure network installations, access control, and computer systems in Constantine.',
    'https://www.facebook.com/TidisTech/',
    'https://www.linkedin.com/company/tidis-tech/'
  ),
  new Sponsor(
    '/logo/socode.svg',
    'partner',
    '',
    'So Code',
    'A tech-training school that offers hands-on courses in AI, web/mobile development, programming, digital marketing and more.',
    'https://www.facebook.com/socode.school.dz',
    'https://www.linkedin.com/company/socode-school/'
  ),
  new Sponsor(
    '/logo/techwaves.png',
    'partner',
    '',
    'TechWaves ENSB',
    'A student tech club at ENSB focused on technology, creativity, and innovation, organizing workshops, collaborations, and community-driven events.',
    'https://www.instagram.com/techwaves.ensb/',
    'https://www.linkedin.com/company/techwavesensb/'
  ),
  new Sponsor(
    '/logo/aiesec.svg',
    'partner',
    '',
    'AIESEC Constantine',
    'A youth-run organization empowering students through leadership development, global volunteering, and impactful international exchange programs.',
    'https://www.facebook.com/aiesec.constantine.75/',
    'https://www.linkedin.com/company/aiesec/'
  ),
];

const SPONSORS: Sponsor[] = [
  new Sponsor(
    '/logo/sponsors/megafete.svg',
    'gold',
    '',
    'Mega Fête',
    'Salle pour les mariages, fiançailles, soutenances, fêtes de circoncision, séminaires et anniversaires',
    'https://www.facebook.com/megafete25/',
    ''
  ),
  new Sponsor(
    '/logo/sponsors/media_smart.png',
    'silver',
    'https://mediasmart.dz/',
    'Media Smart',
    'MediaSmart stands out as a leading agency, entirely dedicated to the creation and realization of tailor-made projects, perfectly adapted to the specific requirements of your sector of activity',
    'https://www.facebook.com/people/Media-Smart-Agence-de-communication-D%C3%A9veloppement-Event/100069324909602/?modal=admin_todo_tour#',
    'https://www.linkedin.com/company/media-smart-communication-web-marketing-events/posts/?feedView=all'
  ),
  new Sponsor(
    '/logo/sponsors/create_dz.png',
    'silver',
    'https://www.createdz.com/',
    'Create Dz',
    'CREATE is a communication agency specializing in website creation, graphic design and web development in constantine Algeria',
    "https://www.facebook.com/p/Create-Dz-100076671481585/",
    'https://dz.linkedin.com/in/create-dz-b54085281'
  ),
  new Sponsor(
    '/logo/sponsors/socode.svg',
    'silver',
    'https://socode.tech/en',
    'SoCode',
    'La première école à Constantine spécialisée dans nouvelles technologie et les métier du numérique.',
    "https://www.facebook.com/socode.school.dz/",
    'https://www.linkedin.com/company/socode-school/'
  ),
  new Sponsor(
    '/logo/sponsors/nexo_pizza.png',
    'bronze',
    'https://nexopizza.com/',
    'Nexo Pizza',
    'La première école à Constantine spécialisée dans nouvelles technologie et les métier du numérique.',
    "https://www.facebook.com/nexopizza/",
    ''
  ),
  // new Sponsor(
  //   '/logo/sponsors/nexo_pizza.png',
  //   'bronze',
  //   'https://nexopizza.com/',
  //   'Miss Chocolata',
  //   'La première école à Constantine spécialisée dans nouvelles technologie et les métier du numérique.',
  //   "https://www.facebook.com/nexopizza/",
  //   ''
  // ),
]

export { PARTNERS, SPONSORS };
