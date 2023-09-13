import { Avatar, Box, Card, CardContent, Typography, Badge } from '@mui/material'
import React from 'react'
import { styled} from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { toUpper } from 'lodash';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const TicketColumn = (props) => {
  const { tickets,users,keyCol,size,icons,headings,isUser } = props;
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  function stringAvatar(name) {
    const x = name.split(' ')
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: x.length === 1 ? x[0][0] : x[0][0]+toUpper(x[1][0]),
    };
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      // backgroundColor: `green`,
      // color: `green`,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `1px solid currentColor`,
        content: '""',
      },
    },
  }));

  const priorityIcons = [<MoreHorizIcon sx={{ color: "gray", border: "1px solid #E5E4E2", padding: "1.5%", marginRight: 1, borderRadius: 1 }} />,
    <SignalCellularAlt1BarIcon sx={{ color: "gray", border: "1px solid #E5E4E2", padding: "1.5%", marginRight: 1, borderRadius: 1 }} />,
    <SignalCellularAlt2BarIcon sx={{color: "gray", border: "1px solid #E5E4E2", padding: "1.5%", marginRight:1, borderRadius: 1}} />,
    <SignalCellularAltIcon sx={{color: "gray", border: "1px solid #E5E4E2", padding: "1.5%", marginRight:1, borderRadius: 1}} />,
    <PriorityHighIcon sx={{color: "white",backgroundColor:"orange", border: "1px solid #E5E4E2", padding: "1.5%", marginRight:1, borderRadius: 1}} />];
  
  return (
    <Box sx={{ margin: "5% 2% 0 2%" }}>
      <Box sx={{width: "400px", margin: "10% 0 1% 10%",display:"flex",flexDirection: "row", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 2 }}>
          {!isUser && icons[keyCol]}
          {console.log(keyCol)}
          {isUser && <Avatar {...stringAvatar(users[keyCol].name)} />}
          <Typography component="p" gutterBottom sx={{ fontSize: "15px", margin: 1, flexGrow: 2, width: "100px" }}>
            {!isUser && headings[keyCol] + " " + size}
            {isUser && users[keyCol].name + "  " + size}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <AddIcon sx={{ color: "gray" }} />
          <MoreHorizIcon sx={{ color: "gray" }} />
        </Box>
      </Box>
      {tickets && tickets.map(ticket => (
          <Card key={ticket.id} sx={{ width: "400px", borderRadius: "3%", borderColor: "gray", margin: "2% 10%" }}>
          <CardContent>
            <Box sx={{display:"flex",flexDirection: "row", justifyContent: "space-between"}}>
              <Typography variant='h6' component='h6' sx={{ color: "gray" }}>{toUpper(ticket.id)}</Typography>
              <StyledBadge overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot" color={users[ticket.userId.split('-')[1]-1].available ? "success" : "warning"}
              >
                <Avatar {...stringAvatar(users[ticket.userId.split('-')[1]-1].name)} />
              </StyledBadge>
            </Box>
            <Typography component='p' sx={{ fontWeight: 550, fontSize: "16px" }} gutterBottom>{ticket.title}</Typography>
            <Box sx={{display:"flex",flexDirection: "row",marginTop: 2}}>
              {priorityIcons[ticket.priority]}
              <Box sx={{border: "1px solid #E5E4E2", borderRadius: "3%", fontSize:"30px", minWidth: 200,display:"flex",flexDirection: "row"}}>
                <FiberManualRecordIcon sx={{ color: "gray",marginRight: "2%",margin: "3% 2%" }} />
                <Typography component='h6' variant="h6" gutterBottom sx={{ color: "gray", margin: "1%" }}>{ticket.tag[0]}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default TicketColumn