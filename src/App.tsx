import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React from 'react';
import './App.css';
import FileUpload from './FileUpload';

const App = () => {
  const [followers, setFollowers] = React.useState([] as string[]);
  const [following, setFollowing] = React.useState([] as string[]);

  const [followersNotFollowing, setFollowersNotFollowing] = React.useState([] as string[]);
  const [followersNotFollowingPage, setFollowersNotFollowingPage] = React.useState([] as string[]);
  const [followersNotFollowingPageIndex, setFollowersNotFollowingPageIndex] = React.useState(1);
  const [followingNotFollowers, setFollowingNotFollowers] = React.useState([] as string[]);
  const [followingNotFollowersPage, setFollowingNotFollowersPage] = React.useState([] as string[]);
  const [followingNotFollowersPageIndex, setFollowingNotFollowersPageIndex] = React.useState(1);

  // followers set page when content or index changes
  React.useEffect(() => {
    setFollowersNotFollowingPage(followersNotFollowing
      .slice((followersNotFollowingPageIndex-1) *10, followersNotFollowingPageIndex*10))

  }, [followersNotFollowing, followersNotFollowingPageIndex]);

  // floowing set page when content or index changes
  React.useEffect(() => {
    setFollowingNotFollowersPage(followingNotFollowers
      .slice((followingNotFollowersPageIndex-1) *10, followingNotFollowersPageIndex*10))

  }, [followingNotFollowers, followingNotFollowersPageIndex]);


  React.useEffect(() => {
    setFollowersNotFollowing(followers.filter(x => !following.includes(x)))
    setFollowingNotFollowers(following.filter(x => !followers.includes(x)))


  }, [followers, following]);

  React.useEffect(() => {
    setFollowersNotFollowingPageIndex(1)
    setFollowingNotFollowersPageIndex(1)
  }, [followersNotFollowing, followingNotFollowers]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={6}> 
          <Box textAlign="left">
            <Typography variant="h6" gutterBottom>
              Followers1.2
            </Typography>
            <FileUpload id="1" setUserNames={setFollowers}/>
          </Box>
        </Grid>
        <Grid item sm={6}> 
          <Box textAlign="left">
            <Typography variant="h6" gutterBottom>
              Following
            </Typography>
            <FileUpload id="2" setUserNames={setFollowing}/>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container spacing={2}>
        <Grid item sm={6}> 
          <Box textAlign="left">
            <Typography variant="h6" gutterBottom>
              Followers not following
            </Typography>
            <List>
              {followersNotFollowingPage.map((name) => (
                <ListItem disablePadding>
                  <ListItemText primary={name} />
                </ListItem>
              ))}

            </List>
          </Box>
          <Pagination count={Math.ceil(followersNotFollowing.length/10)} page={followersNotFollowingPageIndex} onChange={(e, value) => setFollowersNotFollowingPageIndex(value)} />
        </Grid>
        <Grid item sm={6}> 
          <Box textAlign="left">
            <Typography variant="h6" gutterBottom>
              Following not followers
            </Typography>
            <List>
              {followingNotFollowersPage.map((name) => (
                <ListItem disablePadding>
                  <ListItemText primary={name} />
                </ListItem>
              ))}

            </List>
          </Box>
          <Pagination count={Math.ceil(followingNotFollowers.length/10)} page={followingNotFollowersPageIndex} onChange={(e, value) => setFollowingNotFollowersPageIndex(value)} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App;
