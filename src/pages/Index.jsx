import React, { useState } from "react";
import { Box, Grid, Button, Center, Text } from "@chakra-ui/react";

const Index = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

  const renderSquare = (i) => (
    <Button h="100px" w="100px" onClick={() => handleClick(i)} fontSize="3xl" colorScheme={board[i] === "X" ? "blue" : "red"} variant="outline">
      {board[i]}
    </Button>
  );

  return (
    <Center p={10}>
      <Box textAlign="center">
        <Text fontSize="2xl" mb={4}>
          {status}
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {board.map((_, i) => (
            <Box key={i} data-index={i}>
              {renderSquare(i)}
            </Box>
          ))}
        </Grid>
        <Button
          mt={4}
          onClick={() => {
            setBoard(initialBoard);
            setIsXNext(true);
          }}
          colorScheme="teal"
        >
          Restart Game
        </Button>
      </Box>
    </Center>
  );
};

export default Index;
