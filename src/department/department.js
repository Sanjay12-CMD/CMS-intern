// Import local department images from the assets directory
import cseImg from '../assets/computer science.jpg';
import itImg from '../assets/it.jpg';
import eceImg from '../assets/Electronics & Communication Engineering.jpg';
import eeeImg from '../assets/Electrical & Electronics Engineering.jpg';
import mechanicalImg from '../assets/Mechanical Engineering.jpg';
import civilImg from '../assets/civil Engineering.jpg';
import aidsImg from '../assets/Artificial Intelligence & Data Science.jpg';
import aimlImg from '../assets/Artificial Intelligence & Machine Learning.jpg';
import cyberImg from '../assets/Cyber Securityv.jpg';

// Export images for use in other components (e.g. form dropdown)
export { cseImg, itImg, eceImg, eeeImg, mechanicalImg, civilImg, aidsImg, aimlImg, cyberImg };

// Premium Department Dataset for Engineering College Showcase
// This dataset features exactly the 9 engineering branches mapping to local assets.
export const DEPARTMENTS_DATA = [
  {
    id: 'cse',
    name: 'Computer Science Engineering',
    image: cseImg,
    shortDescription: 'Software development, coding, and AI technologies.',
    detailedInfo: 'Computer Science Engineering focuses on programming, artificial intelligence, software engineering, cloud computing, and modern technologies.'
  },
  {
    id: 'it',
    name: 'Information Technology',
    image: itImg,
    shortDescription: 'Networking, database systems, and information security.',
    detailedInfo: 'Information Technology covers data administration, network infrastructure, software development, cloud services, and enterprise database management.'
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    image: eceImg,
    shortDescription: 'Circuit boards, microprocessors, and wireless communications.',
    detailedInfo: 'Electronics & Communication Engineering covers semiconductor devices, circuit design, analog and digital communication, embedded systems, and VLSI technology.'
  },
  {
    id: 'eee',
    name: 'Electrical & Electronics Engineering',
    image: eeeImg,
    shortDescription: 'Power systems, smart grids, and electrical technologies.',
    detailedInfo: 'Electrical & Electronics Engineering specializes in electricity generation, power transmission, control systems, electric vehicle technologies, and green energy.'
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    image: mechanicalImg,
    shortDescription: 'Machine design, thermodynamics, and manufacturing technologies.',
    detailedInfo: 'Mechanical Engineering provides deep insights into thermal dynamics, mechanics of solids, CAD design, fluid dynamics, industrial machinery, and robotic automation.'
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    image: civilImg,
    shortDescription: 'Structural engineering, design, and building construction.',
    detailedInfo: 'Civil Engineering deals with the planning, design, construction, and maintenance of smart buildings, dams, bridges, structural analysis, and environment preservation.'
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    image: aidsImg,
    shortDescription: 'Data analytics, neural networks, and decision systems.',
    detailedInfo: 'Artificial Intelligence & Data Science concentrates on big data processing, visual computing, predictive models, data extraction methods, and smart decision-making algorithms.'
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & Machine Learning',
    image: aimlImg,
    shortDescription: 'Deep learning models, predictive intelligence, and automation.',
    detailedInfo: 'Artificial Intelligence & Machine Learning focuses on neural network training, automated intelligence systems, evolutionary algorithms, and deep learning patterns.'
  },
  {
    id: 'cyber',
    name: 'Cyber Security',
    image: cyberImg,
    shortDescription: 'Data encryption, network threat defense, and ethical hacking.',
    detailedInfo: 'Cyber Security protects critical systems and private networks through cryptography, secure protocols, vulnerability testing, risk management, and cyber forensics.'
  }
];
