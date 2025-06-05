import * as React from 'react';
import { apiQuery } from '~/common/util/trpc.client';
import { Box, Button, List, ListItem, Typography } from '@mui/joy';

export function AppHistory() {
  const { data } = apiQuery.history.listConversations.useQuery({});
  const [selected, setSelected] = React.useState<string | null>(null);
  const convo = apiQuery.history.getConversation.useQuery({ conversationId: selected! }, { enabled: !!selected });

  return (
    <Box sx={{ p: 2 }}>
      <Typography level='h2'>Conversations</Typography>
      <List sx={{ maxWidth: 300 }}>
        {data?.conversations.map(c => (
          <ListItem key={c.id}>
            <Button variant='plain' onClick={() => setSelected(c.id)}>{c.id}</Button>
          </ListItem>
        ))}
      </List>
      {convo.data && (
        <Box>
          <Typography level='h3'>Messages</Typography>
          <List>
            {convo.data.messages.map((m, idx) => (
              <ListItem key={idx}>{m.role}: {m.content}</ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
