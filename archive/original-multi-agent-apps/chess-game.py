import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

# OpenAI Model Client
model_client = OpenAIChatCompletionClient(
    model="gpt-4o-2024-08-06",
    api_key="your-api-key-here"
)

# Define the agents
# Player 1 (White)
player1_agent = AssistantAgent(
    "player1",
    model_client=model_client,
    system_message=(
        "You are Player 1 playing as White. Make moves following chess rules. Seek advice from the coach "
        "if needed and ensure your moves are optimal."
    ),
)

# Player 2 (Black)
player2_agent = AssistantAgent(
    "player2",
    model_client=model_client,
    system_message=(
        "You are Player 2 playing as Black. Make moves following chess rules. Seek advice from the coach "
        "if needed and ensure your moves are optimal."
    ),
)

# Coach/Critic
coach_agent = AssistantAgent(
    "coach",
    model_client=model_client,
    system_message=(
        "You are the Coach. Approve or critique moves from both players. Ensure the moves follow chess rules "
        "and suggest better moves if necessary. Respond with 'APPROVE' when the move is acceptable."
    ),
)

# Reporter
reporter_agent = AssistantAgent(
    "reporter",
    model_client=model_client,
    system_message=(
        "You are the Reporter. Log each move, announce the current state of the board, and declare the winner "
        "or draw at the end of the game."
    ),
)

# Define a termination condition
text_termination = TextMentionTermination("GAME OVER")

# Create a team with the agents
team = RoundRobinGroupChat(
    [player1_agent, player2_agent, coach_agent, reporter_agent],
    termination_condition=text_termination
)

# Task for playing chess
chess_task = "Play a game of classical chess. Each player must make a move and have it approved by the coach. Reporter logs the moves and announces the result."

async def main():
    # Run the chess game
    await Console(team.run_stream(task=chess_task))

# Run the script
if __name__ == "__main__":
    asyncio.run(main())
