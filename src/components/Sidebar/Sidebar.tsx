import React from 'react'
import { AdminSidebarProps } from ".";
import { Box , List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from '@mui/material'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useRouter } from 'next/router';

import EngineeringIcon from '@mui/icons-material/Engineering';

const ControlledAdministratorSidebar: React.FC<AdminSidebarProps> = (props) => {
    const {
        open, handleDrawerClose, theme, handleClick, dropDown, Drawer, DrawerHeader, sidebarConfig, subsidebarConfig
    } = props
    const router = useRouter()
    return (
        <React.Fragment>
            <Drawer
            open={open}
            variant="permanent"
            PaperProps={{
                sx: {
                    backgroundColor: '#051e34',
                    color: 'white',
                }
            }}
            >
                <Box className="flex flex-col justify-between h-full">
                    <Box
                    className='flex flex-col'
                    >
                        <DrawerHeader>
                            <Box className='flex gap-2 items-center'>
                                {/* image logo here */}
                                <img 
                                src='/natwest.png'
                                style={{
                                    width: '100%'
                                }}
                                />
                            </Box>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                <ChevronRightIcon style={{ color: "white" }} />
                                ) : (
                                <ChevronLeftIcon style={{ color: "white" }} />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider className='bg-sideBarTabHover' />
                        <List style={{ marginTop : '5px'}}>
                            {
                                sidebarConfig?.map((text: any, outerIndex: any) => (
                                    <Box key={outerIndex} className='flex flex-col items-center'>
                                        <ListItem
                                        key={text}
                                        disablePadding
                                        sx={{
                                            display: 'block',
                                            background: '#122c44',
                                            margin: '4px 0px',
                                            borderRadius: '10px',
                                            width: '90%',
                                            '&:hover': {
                                                backgroundColor: '#253d53'
                                            }
                                        }}
                                        >
                                            {text.dropDown ? (
                                                <>
                                                {
                                                    text.dropDownChildren?.length > 0 && text.dropDownChildren?.map((item : any, innerIndex: any) => (
                                                        <>
                                                            <ListItemButton key={innerIndex} disabled={item.disable} onClick={() => handleClick(outerIndex, innerIndex)}>
                                                                {item.icon}
                                                                <ListItemText primary={item.parentMenu} />
                                                                {item.dropDown ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItemButton>
                                                            {
                                                                item.childMenu.map((child: any) => (
                                                                    <>
                                                                        <Collapse in={item.dropDown} key={innerIndex} timeout="auto" unmountOnExit>
                                                                            <List component="div" disablePadding>
                                                                                <ListItemButton sx={{ pl : 4}} onClick={() => router.push(child.uri)}>
                                                                                    {child.icon}
                                                                                    <ListItemText primary={child.title} />
                                                                                </ListItemButton>
                                                                            </List>
                                                                        </Collapse>
                                                                    </>
                                                                ))
                                                            }
                                                        </>
                                                    ))
                                                }
                                                </>
                                            ) : (
                                                <>
                                                    <ListItemButton
                                                    sx={{
                                                        minHeight: 48,
                                                        justifyContent: open? "initial" : "center",
                                                        px: 2.5
                                                    }}
                                                    onClick={() => router.push(text.uri)}
                                                    disabled={text.disable}
                                                    >
                                                        <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            mr: open? 3: "auto",
                                                            justifyContent: "center",
                                                            color: "white"
                                                        }}
                                                        >
                                                            {text.icon}
                                                        </ListItemIcon>
                                                        <ListItemText 
                                                        primary={text.title}
                                                        sx={{ opacity: open ? 1 : 0}}
                                                        />
                                                        {text.disable && <EngineeringIcon className='text-white' />}
                                                    </ListItemButton>
                                                </>
                                            )}
                                        </ListItem>
                                    </Box>
                                ))
                            }
                        </List>
                        <Divider className='bg-sideBarTabHover' />
                        <List>
                            {["Our Products", "Settings"].map((text: any, index: any) => (
                                <Box className="flex flex-col items-center">
                                    <ListItem
                                    key={text}
                                    disablePadding
                                    sx={{
                                        display: "block",
                                        background: "#122c44",
                                        margin: "4px 0px",
                                        borderRadius: "10px",
                                        width: "90%",
                                        "&:hover": {
                                          backgroundColor: "#253d53",
                                        },
                                      }}
                                    >
                                        <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? "initial" : "center",
                                            px: 2.5,
                                          }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : "auto",
                                                justifyContent: "center",
                                                color: "white",
                                                }}
                                            >
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={text}
                                                sx={{ opacity: open ? 1 : 0 }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Box>
                            ))}
                        </List>
                    </Box>
                    {/* SIDEBAR HEADER AND CONTENT END */}
                    {/* SIDEBAR FOOTER */}
                    <Box className="flex flex-col py-2 gap-2">
                        <Divider className="bg-sideBarTabHover" />
                        <h3
                        className={
                            open ? "block font-serif text-white text-center" : "hidden"
                        }
                        >
                        All rights Reserved WTW 
                        </h3>
                    </Box>
                    {/* SIDEBAR FOOTER ENDS */}
                </Box>
            </Drawer>
        </React.Fragment>
    )
}

export default ControlledAdministratorSidebar