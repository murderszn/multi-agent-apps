# Multi-Agent Apps

Welcome to **Multi-Agent Apps** – a collection of examples showcasing creative ways to use **Microsoft Autogen** for building AI-powered applications or performing complex AI-driven tasks. Whether you're a developer exploring multi-agent collaboration or looking for inspiration for your next AI project, this repository offers structured, reusable templates for multi-agent systems.

---

## Features

- **Multi-Agent Collaboration:** Examples demonstrate agents specializing in tasks, collaborating effectively to achieve goals.
- **Custom Termination Conditions:** Define when tasks or projects are marked as complete using termination triggers.
- **Dynamic Teams:** Organize agents into flexible groups like round-robin chats or task-specific collaborations.
- **Integration with Microsoft Autogen:** Leveraging the powerful `autogen` framework to build modular, scalable AI systems.
- **Interactive Console UI:** Observe real-time collaboration and task updates through a simple UI.

---

## Example: Building a Financial Budgeting Website

This example demonstrates how multiple agents collaborate to create a fully functional financial budgeting website with six pages:

- **Index Page**
- **User Intake Questionnaire**
- **Income Tracking**
- **Monthly Budget**
- **Net Worth Calculator**
- **Financial Health Assessment**

### Code Snippet

```python
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

# Define the Planner/Moderator Agent
planner_agent = AssistantAgent(
    "planner",
    model_client=OpenAIChatCompletionClient(model="gpt-4", api_key="your_api_key_here"),
    system_message="You are the Planner and Moderator...",
)

# Example: Index Agent
index_agent = AssistantAgent(
    "index_agent",
    model_client=model_client,
    system_message="You are responsible for creating the Index page..."
)

# Team and Termination Setup
termination_condition = TextMentionTermination("PROJECT COMPLETED")
team = RoundRobinGroupChat(
    [planner_agent, index_agent],
    termination_condition=termination_condition
)

# Async Function to Run the Task
async def main():
    await Console(team.run_stream(task="Develop the financial budgeting website..."))

if __name__ == "__main__":
    asyncio.run(main())
