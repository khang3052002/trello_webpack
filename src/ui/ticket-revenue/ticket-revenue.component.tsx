import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  num_ticket: number;
  revenue: number;
}

const TicketRevenueComponent: React.FC<Props> = ({ num_ticket, revenue }) => {
  return (
    <Box sx={{ display: "flex", pl: "12px", mb: 1 }}>
      <Typography variant="body2">{num_ticket + " " + "ticket"}</Typography>/
      <Typography variant="body2">{revenue + "$"}</Typography>
    </Box>
  );
};

export default TicketRevenueComponent;
