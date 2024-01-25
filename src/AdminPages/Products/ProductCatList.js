import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import RollerSkatingOutlinedIcon from "@mui/icons-material/RollerSkatingOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import categoryData from "../../Resources/Types.json";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from "./categorySlice";

import { indigo } from "@mui/material/colors";

export function EmojioneMonotoneBadminton(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="1.8em" viewBox="0 0 64 64" {...props}><path fill="#1a237e" d="M55.693 26.207c6.678-6.676 8.35-16.715 3.58-21.48c-4.768-4.77-14.803-3.098-21.48 3.578c-5.478 5.481-6.711 12.556-3.387 17.709l-1.762 1.762a2.523 2.523 0 0 0-.646 2.437L19.982 42.225l-5.145 3.359s-4.477 4.475-9.846 9.846c-.486.484-2.434 1.254-2.434 1.254c-.631.295-.744.939-.252 1.43l3.58 3.58c.492.492 1.135.381 1.43-.25c0 0 .77-1.949 1.254-2.434l9.848-9.846l3.355-5.146l12.016-12.016a2.52 2.52 0 0 0 2.436-.646l1.762-1.761c5.155 3.325 12.229 2.093 17.707-3.388M40.049 9.665l1.326 1.325l-1.791 1.791l-1.264-1.265c.391-.483.803-.96 1.264-1.421c.15-.149.311-.285.465-.43m11.005-5.106l1.06 1.06l-1.79 1.791l-1.791-1.791l.853-.851a14.024 14.024 0 0 1 1.668-.209m-4.308 11.802l-1.791 1.789l-1.791-1.791l1.789-1.787l1.793 1.789m-.896-2.685l1.791-1.791l1.787 1.791l-1.787 1.791l-1.791-1.791m-1.789 5.369l-1.791 1.791l-1.791-1.789l1.791-1.791l1.791 1.789m0 5.371l-1.791 1.789l-1.791-1.787l1.791-1.793l1.791 1.791m-.897-2.686l1.791-1.789l1.791 1.789l-1.791 1.789l-1.791-1.789m4.477.895l1.787 1.793l-1.789 1.789l-1.791-1.789l1.793-1.793m-.002-1.789l-1.789-1.791l1.791-1.789l1.787 1.791l-1.789 1.789m.894-4.475l1.791-1.789l1.789 1.789l-1.789 1.789l-1.791-1.789m2.686-2.685l1.791-1.791l1.789 1.791l-1.789 1.791l-1.791-1.791m4.476.894l1.789 1.791l-1.789 1.789l-1.789-1.791l1.789-1.789m.895-.894l1.791-1.791l1.061 1.061a13.883 13.883 0 0 1-.21 1.67l-.851.851l-1.791-1.791m-.895-.895l-1.789-1.793l1.789-1.789l1.789 1.789l-1.789 1.793m-2.685-2.685l-1.791-1.791l1.791-1.791l1.789 1.791l-1.789 1.791m-.897.894l-1.789 1.791l-1.791-1.791l1.791-1.789l1.789 1.789m-4.472-.894L45.85 8.305l1.791-1.789l1.787 1.789l-1.787 1.791m-.895.894l-1.791 1.791l-1.791-1.793l1.791-1.789l1.791 1.791m-2.685 2.686l-1.791 1.789l-1.789-1.789l1.789-1.791l1.791 1.791m-2.686 2.685l-1.791 1.789l-1.791-1.789l1.791-1.789l1.791 1.789m-2.686 2.684L36.9 20.834l-1.744-1.741l.006-.098l1.738-1.739l1.789 1.789m.895.896l1.791 1.789l-1.791 1.791l-1.791-1.791l1.791-1.789m1.791 7.161l-.945.945a8.987 8.987 0 0 1-2.162-1.417l1.316-1.317l1.791 1.789m.895.896l.791.789a9.26 9.26 0 0 1-1.313-.268l.522-.521m2.638.848l-1.744-1.744l1.791-1.791l1.791 1.791l-1.738 1.738l-.1.006m2.733-.85l.26.26c-.246.083-.493.154-.74.221l.48-.481m.894-.894l1.789-1.789l1.137 1.135c-.747.515-1.51.948-2.281 1.3l-.645-.646m0-5.372l1.789-1.789l1.789 1.789l-1.789 1.791l-1.789-1.791m2.686-2.685l1.789-1.789l1.791 1.789l-1.791 1.791l-1.789-1.791m4.474.896l.989.989c-.45.713-.958 1.404-1.508 2.071l-1.271-1.271l1.79-1.789m.893-.894l1.793-1.791l.086.086c-.307.826-.68 1.651-1.12 2.462l-.759-.757m2.685-8.057l.129-.128c.011.1.031.195.04.296l-.169-.168m-.892-.894L56.59 8.305l1.305-1.306c.548.682.951 1.48 1.211 2.372l-.725.725M55.695 7.41l-1.789-1.791l.725-.725c.891.26 1.689.663 2.37 1.21L55.695 7.41M53.01 4.725l-.167-.167c.101.008.195.029.294.041l-.127.126m-6.264.894L44.955 7.41l-.757-.757c.81-.44 1.636-.813 2.462-1.121l.086.087m-2.685 2.686l-1.791 1.791l-1.271-1.271a20.015 20.015 0 0 1 2.072-1.509l.99.989m-5.372 5.371L36.9 15.467l-.646-.646c.352-.771.784-1.535 1.3-2.282l1.135 1.137m-2.685 2.685l-.479.479c.065-.247.137-.492.22-.739l.259.26m0 5.369l-.521.522a9.345 9.345 0 0 1-.268-1.311l.789.789m.896.895l1.789 1.791l-1.316 1.319a9 9 0 0 1-1.419-2.163l.946-.947m15.586 3.056l-1.266-1.265l1.789-1.791l1.326 1.328c-.144.154-.279.313-.43.463c-.46.461-.936.874-1.419 1.265M39.344 39.344a4.933 4.933 0 0 0 0 6.973l6.971-6.973a4.931 4.931 0 0 0-6.971 0m10.457 3.484l-1.742-1.74l-6.973 6.971l1.742 1.742L48.057 62l1.744-1.742l-1.045-2.438l1.744-1.744l1.479 2.004l1.744-1.744l-1.48-2.002l1.744-1.744l1.914 1.568l1.742-1.742l-1.914-1.568l2.092-2.092l2.438 1.045L62 48.059l-12.199-5.231m.699 2.791l-.525.525l-1.918-1.572l2.443 1.047m-4.881 4.883l-1.047-2.443l1.482 2.006l-.435.437m2.613-2.615l-.436.436l-1.482-2.008l1.918 1.572m-.523 7.492l-1.043-2.436l.871-.871l1.479 2l-1.307 1.307m3.051-3.051l-1.479-2l.873-.873l1.912 1.566l-1.306 1.307m3.049-3.049l-1.912-1.566l1.047-1.047l2.434 1.043l-1.569 1.57"></path></svg>
  )
}

export function Fa6SolidTableTennisPaddleBall(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.3em" viewBox="0 0 640 512" {...props}><path fill="#1a237e" d="M480 288c-50.1 0-93.6 28.8-114.6 70.8L132.9 126.3l.6-.6l60.1-60.1c87.5-87.5 229.3-87.5 316.8 0c67.1 67.1 82.7 166.3 46.8 248.3C535.8 297.6 509 288 480 288zM113.3 151.9l240.8 240.8c-1.4 7.5-2.1 15.3-2.1 23.3c0 23.2 6.2 44.9 16.9 63.7c-3 .2-6.1.3-9.2.3H357c-33.9 0-66.5-13.5-90.5-37.5l-9.8-9.8c-13.1-13.1-34.6-12.4-46.8 1.7L152.2 501c-5.8 6.7-14.2 10.7-23 11s-17.5-3.1-23.8-9.4l-32-32c-6.3-6.3-9.7-14.9-9.4-23.8s4.3-17.2 11-23l66.6-57.7c14-12.2 14.8-33.7 1.7-46.8l-9.8-9.8c-24-24-37.5-56.6-37.5-90.5v-2.7c0-22.8 6.1-44.9 17.3-64.3zM480 320a96 96 0 1 1 0 192a96 96 0 1 1 0-192z"></path></svg>
  )
}

function ProductCatList() {
 
  const dispatch=useDispatch()
  const [openBadminton, setOpenBadminton] = React.useState(false);

  const handleClickBadminton = () => {
    setOpenBadminton(!openBadminton);
  };

  const [openCricket, setOpenCricket] = React.useState(false);

  const handleClickCricket = () => {
    setOpenCricket(!openCricket);
  };
  const [openTennis, setOpenTennis] = React.useState(false);

  const handleClickTennis = () => {
    setOpenTennis(!openTennis);
  };
  const [openTableTennis, setOpenTableTennis] = React.useState(false);

  const handleClickTableTennis = () => {
    setOpenTableTennis(!openTableTennis);
  };
  const [openSkating, setOpenSkating] = React.useState(false);

  const handleClickSkating = () => {
    setOpenSkating(!openSkating);
  };
  const [openBallSports, setOpenBallSports] = React.useState(false);

  const handleClickBallSports = () => {
    setOpenBallSports(!openBallSports);
  };

  const [openGymFitness, setOpenGymFitness] = React.useState(false);

  const handleClickGymFitness = () => {
    setOpenGymFitness(!openGymFitness);
  };

  const [openOtherSports, setOpenOtherSports] = React.useState(false);

  const handleClickOtherSports = () => {
    setOpenOtherSports(!openOtherSports);
  };


  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      className="mt-4"
    >
      {/* Badminton List */}
      <ListItemButton onClick={handleClickBadminton}>
        <ListItemIcon>
          <EmojioneMonotoneBadminton />
        </ListItemIcon>
        <ListItemText primary="Badminton"/>
        {openBadminton ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBadminton} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            categoryData.filter(cat=> cat.group==="Badminton").map(e=>
              <ListItemButton sx={{ pl: 4 }} >
                <ListItemText primary={e.label} onClick={()=>{dispatch(setCategory(e.label))}}/>
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Cricket List */}
      <ListItemButton onClick={handleClickCricket}>
        <ListItemIcon>
          <SportsCricketIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Cricket" />
        {openCricket ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCricket} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            categoryData.filter(cat=> cat.group==="Cricket").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Tennis List */}
      <ListItemButton onClick={handleClickTennis}>
        <ListItemIcon>
          <SportsTennisIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Tennis" />
        {openTennis ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTennis} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Tennis").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Table Tennis List */}
      <ListItemButton onClick={handleClickTableTennis}>
        <ListItemIcon>
          <Fa6SolidTableTennisPaddleBall />
        </ListItemIcon>
        <ListItemText primary="Table Tennis" />
        {openTableTennis ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTableTennis} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Table Tennis").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Skating List */}
      <ListItemButton onClick={handleClickSkating}>
        <ListItemIcon>
          <RollerSkatingOutlinedIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Skating" />
        {openSkating ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSkating} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Skating").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Ball Sports List */}
      <ListItemButton onClick={handleClickBallSports}>
        <ListItemIcon>
          <SportsSoccerOutlinedIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Ball Sports" />
        {openBallSports ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBallSports} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Ball Sports").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Gym & Fitness List */}
      <ListItemButton onClick={handleClickGymFitness}>
        <ListItemIcon>
          <FitnessCenterIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Gym & Fitness" />
        {openGymFitness ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openGymFitness} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Gym & Fitness").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>

      {/* Other Sports List */}
      <ListItemButton onClick={handleClickOtherSports}>
        <ListItemIcon>
          <PoolIcon sx={{ color: indigo[900] }} />
        </ListItemIcon>
        <ListItemText primary="Other Sports" />
        {openOtherSports ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOtherSports} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
            categoryData.filter(cat=> cat.group==="Other Sports").map(e=>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{dispatch(setCategory(e.label))}}>
                <ListItemText primary={e.label} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>
    </List>
  );
}

export default ProductCatList;
