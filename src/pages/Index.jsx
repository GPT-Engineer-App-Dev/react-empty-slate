import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events: {error.message}</Text>;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Welcome to Your Event App</Text>
        <Text>Here are the upcoming events:</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>
                  <Link as={RouterLink} to={`/event/${event.id}`}>
                    {event.name}
                  </Link>
                </Td>
                <Td>{new Date(event.date).toLocaleDateString()}</Td>
                <Td>{event.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;