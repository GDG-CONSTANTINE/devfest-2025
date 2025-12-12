import ScheduleItem from '@/Models/schedule_item';
import Speaker from '@/Models/Speakers';

const SCHEDULE_ITEMS = [
  // DAY 1 - December 13, 2025
  new ScheduleItem(
    '09:30',
    '10:00',
    13,
    Date.now(),
    'Opening Ceremony',
    null,
    null,
    'ceremony'
  ),
  new ScheduleItem(
    '10:00',
    '11:00',
    13,
    Date.now(),
    'Ethernet meets Generative AI',
    new Speaker('Abdenour Aliane', 'AbdenourAliane.png', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '11:00',
    '12:00',
    13,
    Date.now(),
    'Building Production-Ready Apps with AI',
    new Speaker('Raouf Rahiche', 'RaoufRahiche.png', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '12:15',
    '13:00',
    13,
    Date.now(),
    'How AI Is Transforming the Cloud: From Predictive Scaling to Self-Healing Systems',
    new Speaker('Imane Khoums', 'ImaneKHOUMS.jpg', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '14:00',
    '15:30',
    13,
    Date.now(),
    'Build an AI E-Commerce Recommender Agent with LangChain & Node.js',
    new Speaker('Abd Echafi Filali', 'abd_echafi.jpg', '', ''),
    null,
    'workshop',
    1
  ),
  new ScheduleItem(
    '14:00',
    '15:30',
    13,
    Date.now(),
    'Privacy-First AI: Building Your First Federated Learning System with the Flower Framework',
    new Speaker('Pius Sunday Ojwo', 'sunny.jpg', '', ''),
    null,
    'workshop',
    2
  ),

  // DAY 2 - December 14, 2025
  new ScheduleItem(
    '09:30',
    '10:00',
    14,
    Date.now(),
    'Day 2 Opening',
    null,
    null,
    'ceremony'
  ),
  new ScheduleItem(
    '10:00',
    '11:00',
    14,
    Date.now(),
    'Building AI Agents with ADK and A2A.',
    new Speaker('Mohamed Berrimi', 'MohamedBerrimi.jpg', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '11:00',
    '12:00',
    14,
    Date.now(),
    'Containerization: The Engine Behind Cloud Native Innovation',
    new Speaker('Reda Mouffok', 'RedaMOUFFOK.png', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '12:15',
    '13:00',
    14,
    Date.now(),
    'A Day in the Life of a DevOps Engineer',
    new Speaker('Nadir Saoudi', 'NadirSaoudi.png', '', ''),
    null,
    'talk'
  ),
  new ScheduleItem(
    '14:00',
    '15:30',
    14,
    Date.now(),
    'Hands-On K-Means Clustering for Movie Recommendation Systems',
    new Speaker('Necib Taha Abdeerhmane', 'TahaNecibi.jpg', '', ''),
    null,
    'workshop',
    1
  ),
  new ScheduleItem(
    '14:00',
    '15:30',
    14,
    Date.now(),
    'TBD',
    null,
    null,
    'workshop',
    2
  ),
];

export default SCHEDULE_ITEMS;
