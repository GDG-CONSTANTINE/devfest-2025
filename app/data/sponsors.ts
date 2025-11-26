import Sponsor from '@/Models/sponsors';

const SPONSORS_AND_PARTNERS = [
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
    '/logo/Tidis Tech.svg',
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
    'A tech-training school that offers hands-on courses in AI, web/mobile development, programming, digital marketing and more with flexible, project-based learning.',
    'https://www.facebook.com/socode.school.dz',
    'https://www.linkedin.com/company/socode-school/'
  ),
];

export default SPONSORS_AND_PARTNERS;
