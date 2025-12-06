import Speaker from "@/Models/Speakers";
import WorkShopItem from "@/Models/workshop";

const workshops_list = [
    new WorkShopItem
        ("Build an AI E-Commerce Recommender Agent with LangChain & Node.js",
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
                "Abd echafi",
                "abd_echafi.jpg",
                "",
                "https://www.linkedin.com/in/abd-echafi-filali-a790b0330"))
]


export default workshops_list