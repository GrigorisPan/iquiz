import React, { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { teacherRoutes, studentRoutes, mainRoutes } from './routes';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

let routes = [];
export default function Route(props) {
  if (props.role === 'teacher') {
    routes = teacherRoutes;
  } else if (props.role === 'student') {
    routes = studentRoutes;
  } else {
  }

  const value = props.value;
  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            props.setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, props]);

  return (
    <React.Fragment>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            classes={{ selected: props.classes.drawerItemSelected }}
            onClick={() => {
              props.setOpenDrawer(false);
              props.setValue(route.activeIndex);
            }}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText variant='body2' disableTypography>
              {' '}
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
        <Divider />
        <List />
        {mainRoutes.map((route) => (
          <ListItem
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            classes={{ selected: props.classes.drawerItemSelected }}
            onClick={() => {
              props.setOpenDrawer(false);
              props.setValue(route.activeIndex);
            }}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText variant='body2' disableTypography>
              {' '}
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
