import { useParams } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useComments } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { eventId } = useParams();
  const { data: comments, isLoading, error } = useComments();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading comments: {error.message}</Text>;

  const eventComments = comments.filter(comment => comment.event_id === parseInt(eventId));

  return (
    <Box p={4}>
      <Heading mb={4}>Event Details</Heading>
      <VStack spacing={4} align="start">
        {eventComments.length > 0 ? (
          eventComments.map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>{comment.content}</Text>
              <Text fontSize="sm" color="gray.500">Posted on: {new Date(comment.created_at).toLocaleString()}</Text>
            </Box>
          ))
        ) : (
          <Text>No comments for this event.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default EventDetails;