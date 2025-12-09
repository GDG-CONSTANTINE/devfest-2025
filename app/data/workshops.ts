import Speaker from '@/Models/Speakers';
import WorkShopItem from '@/Models/workshop';

const workshops_list = [
  new WorkShopItem(
    'Build an AI E-Commerce Recommender Agent with LangChain & Node.js',
    `In this hands-on workshop, you will learn how to build an AI-powered product recommender agent similar to what real e-commerce websites use.
            Using LangChain and Node.js, we will implement an agent that can:

            fetch and analyze product data

            compare different items

            filter products based on budget & specs

            generate smart recommendations

            You’ll see how agentic AI works in practice and how to expose the agent through a simple Express API.
            This workshop is perfect for developers who want to go beyond prompts and build real tool-using AI systems.`,
    `To get the most out of this workshop, participants should have:

            Basic knowledge of JavaScript

            Familiarity with Node.js and Express

            A laptop with Node.js (v16 or higher) installed

            A text editor (VS Code recommended)`,
    new Speaker(
      'Abd echafi',
      'abd_echafi.jpg',
      '',
      'https://www.linkedin.com/in/abd-echafi-filali-a790b0330'
    )
  ),
  new WorkShopItem(
    'Privacy-First AI: Building Your First Federated Learning System with the Flower Framework',
    `With data privacy regulations limiting ML trainings, federated learning offers a secure solution—training AI models without ever centralizing sensitive data. Discover how to train AI models without centralizing sensitive data using federated learning. This hands-on workshop covers the fundamentals of privacy-preserving AI and walks participants through building a complete federated learning system with the Flower Framework. Attendees will learn how multiple clients can collaboratively train a shared model while keeping their data completely private and leave with working code ready for real-world applications in healthcare, finance, and IoT.`,
    `Basic understanding of Python programming

            Familiarity with machine learning concepts (what a model is, what training means) is helpful but not required.

            Laptop with at least 8 GB RAM

            Anaconda or Miniconda installed

            Git installed for cloning the workshop repository

            Stable internet connection for package installation`,
    new Speaker(
      'Pius Sunday Ojwo',
      'sunny.jpg',
      '',
      'www.linkedin.com/in/pius-sunday-ojwo'
    )
  ),
  new WorkShopItem(
    'Build a Movie Recommendation System from Scratch with Scikit-Learn and K-Means Clustering (Hands-on Workshop)',
    `In this hands-on workshop, participants will build a fully functional movie recommendation engine using scikit-learn and K-Means clustering—no deep learning required. Using the MovieLens dataset, attendees will transform user ratings into feature vectors, apply K-Means to discover user groups with similar tastes, generate personalized recommendations, and visualize clusters in 2D using PCA. Everything runs live in Google Colab with zero installation needed.`,
    `Attendees only need basic Python knowledge and will leave with a working recommender system ready to extend or deploy.`,
    new Speaker(
      'Necib Taha Abdeerhmane',
      'TahaNecibi.jpg',
      '',
      'https://www.linkedin.com/in/taha-abderrhman-nacib'
    )
  ),
];

export default workshops_list;
