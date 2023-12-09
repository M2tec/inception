import { useState } from 'react';

import {
    Sidebar,
    Menu,
    MenuItem,
    MenuItemStyles,
    menuClasses
  } from 'react-pro-sidebar';
// type Theme = 'light' | 'dark';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const themes = {
    light: {
      sidebar: {
        backgroundColor: '#ffffff',
        color: '#607489',
      },
      menu: {
        menuContent: '#fbfcfd',
        icon: '#0098e5',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#2a3343',
        color: '#ffffff',
      },
      menu: {
        menuContent: '#082440',
        icon: '#fffff',
        hover: {
          backgroundColor: '#00458b',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  };

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

const GcSideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [hasImage, setHasImage] = useState(false);

    const menuItemStyles = {
        root: {
          fontSize: '14px',
          fontWeight: 400,
        },
        icon: {
          color: themes[theme].menu.icon,
          [`&.${menuClasses.disabled}`]: {
            color: themes[theme].menu.disabled.color,
          },
        },
        SubMenuExpandIcon: {
          color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
          backgroundColor:
            level === 0
              ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
              : 'transparent',
        }),
        button: {
          [`&.${menuClasses.disabled}`]: {
            color: themes[theme].menu.disabled.color,
          },
          '&:hover': {
            backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
            color: themes[theme].menu.hover.color,
          },
        },
        label: ({ open }) => ({
          fontWeight: open ? 600 : undefined,
        }),
      };

    return (
    <Sidebar 
        collapsed="True"
        collapsedWidth='3rem'
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{
            color: themes[theme].sidebar.color,
            border: "None",
        }}
        >
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem icon={<FileCopyIcon />}> Files </MenuItem>
          <MenuItem icon={<FindInPageIcon />}> Search </MenuItem>
        </Menu>
    </Sidebar>
    )
}

export default GcSideBar;