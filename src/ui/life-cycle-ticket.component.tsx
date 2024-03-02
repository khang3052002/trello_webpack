import { Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface Props {
  shortCode: string;
}

const LifeCycleTicketComponent: React.FC<Props> = ({ shortCode }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ mb: 1, fontSize: "16px", fontWeight: 600 }}>
        Content Life Cycle Ticket {shortCode}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="success" color="success" variant="outlined" />
      </Stack>
    </Box>
  );
};

export default LifeCycleTicketComponent;
