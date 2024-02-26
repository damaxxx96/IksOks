def check_game_over(board_string) -> str | None:
    # Convert the string to a list of strings
    board = board_string.split(',')

    # Define winning combinations
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
        [0, 4, 8], [2, 4, 6]              # Diagonals
    ]

    for combo in winning_combinations:
        marks = [board[i][1] for i in combo]
        if all(mark == marks[0] and mark != '*' for mark in marks):
            return marks[0]

    # Check if the game is a tie
    if all(cell[1] != '*' for cell in board):
        return 'Tie'

    # If no winner and no empty cell, it's not over yet
    return None

# Example usage:
# Assuming 'board_string' is a string representing the Tic-Tac-Toe board
# 'X' or 'O' for player marks, '*' for empty cells, and ',' as the separator

# board_string = "1X,2X,3X,4O,5X,6O,7O,8O,9X"
# result = check_game_over(board_string)

# if result == 'Tie':
#     print("It's a tie!")
# elif result:
#     print(f"{result} wins!")
# else:
#     print("The game is not over yet.")
