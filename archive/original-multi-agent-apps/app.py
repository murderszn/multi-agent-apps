import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

# Create a model client using gpt-3.5-turbo
model_client = OpenAIChatCompletionClient(
    model="gpt-4o-2024-08-06",
    api_key="your-api-key"
)

# Define the Planner/Moderator Agent
planner_agent = AssistantAgent(
    "planner",
    model_client=model_client,
    system_message=(
        "You are the Planner and Moderator for this project. You are the ONLY agent authorized to declare project completion. "
        "Your role is to coordinate tasks, ensure alignment between agents, and track overall progress. "
        "Begin by outlining a clear project plan for developing the financial budgeting website with "
        "the following pages: Index, User Intake Questionnaire, Income, Monthly Budget, Net Worth Calculator, and Financial Health Assessment. "
        "Ensure all agents collaborate effectively, resolve conflicts if they arise, and validate task completions. "
        "Provide updates and summarize progress periodically. Only declare 'PROJECT COMPLETED' when you have verified all pages "
        "are successfully finalized and integrated."
    ),
)
# Create execution agents for each webpage with completion declarations
index_agent = AssistantAgent(
    "index_agent", 
    model_client=model_client,
    system_message=(
        "You are responsible for creating the Index page of the financial budgeting website. "
        "Ensure the page is welcoming, includes a site overview, and provides navigation links to all other pages. "
        "Use clean and modern HTML and CSS. When your page is complete, notify the planner of your completion status."
    ),
)

intake_agent = AssistantAgent(
    "intake_agent",
    model_client=model_client, 
    system_message=(
        "You are responsible for creating the User Intake Questionnaire page. "
        "This page should include a form to gather user information, such as age, income level, financial goals, and expenses. "
        "Focus on accessibility and clean design. When your page is complete, notify the planner of your completion status."
    ),
)

income_agent = AssistantAgent(
    "income_agent",
    model_client=model_client,
    system_message=(
        "You are responsible for creating the Income page. "
        "This page should include a form or interface for users to input and categorize their income sources. "
        "Focus on responsive design and simplicity. When your page is complete, notify the planner of your completion status."
    ),
)

budget_agent = AssistantAgent(
    "budget_agent",
    model_client=model_client,
    system_message=(
        "You are responsible for creating the Monthly Budget page. "
        "This page should provide a user-friendly way to allocate expenses into categories such as housing, food, transportation, etc. "
        "Include visual elements like progress bars or pie charts to make budgeting intuitive. When your page is complete, notify the planner of your completion status."
    ),
)

networth_agent = AssistantAgent(
    "networth_agent",
    model_client=model_client,
    system_message=(
        "You are responsible for creating the Net Worth Calculator page. "
        "This page should include fields for users to input assets and liabilities, and calculate their net worth. "
        "Ensure clarity in layout and provide helpful tooltips for financial terms. When your page is complete, notify the planner of your completion status."
    ),
)

health_agent = AssistantAgent(
    "health_agent",
    model_client=model_client,
    system_message=(
        "You are responsible for creating the Financial Health Assessment page. "
        "This page should analyze user data to provide insights and recommendations about their financial wellbeing. "
        "Include clear visualizations and actionable advice. When your page is complete, notify the planner of your completion status."
    ),
)

# Define termination condition that checks for all page completions and final project completion
text_termination = TextMentionTermination("PROJECT COMPLETED")

# Create team with all agents
team = RoundRobinGroupChat(
    [planner_agent, index_agent, intake_agent, income_agent, budget_agent, networth_agent, health_agent],
    termination_condition=text_termination
)

async def main():
    # Task: Develop and integrate the financial budgeting website
    await Console(team.run_stream(task="Develop and integrate the financial budgeting website with the following pages: "
                                       "- Index (index_agent)"
                                       "- User Intake Questionnaire (intake_agent)"
                                       "- Income (income_agent)"
                                       "- Monthly Budget (budget_agent)"
                                       "- Net Worth Calculator (networth_agent)"
                                       "- Financial Health Assessment (health_agent). "
                                       "Planner, oversee and coordinate all tasks, ensure collaboration, and validate progress. "))

# Properly invoke the asyncio event loop.
if __name__ == "__main__":
    asyncio.run(main())
