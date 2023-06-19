import { Flex, Heading,Box,Text, Button, Spacer, HStack, Switch, useColorMode, IconButton} from '@chakra-ui/react';
import React, { useState,useContext } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import {UserContext} from "../UserContext";
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  let userContext = useContext(UserContext);
  const{isLoggedIn,currentUserName,currentUserRole} = userContext.user;
  console.log(currentUserName)

  const logout = () => {
    userContext.setUser({
      ...userContext.user,
      isLoggedIn:false,
      currentUserName: null,
      currentUserRole:null,
      currentUserId: null
  });
    navigate("/");
    console.log('logout now', userContext.user)
  };

  const {colorMode, toggleColorMode} = useColorMode()
  const isDark = colorMode === 'dark'

  const[display, setDisplay] = useState('none');

  return (
    <>
    <Flex as='nav' p='10px' alignItems='center' flexWrap='wrap' boxShadow='lg'>
      <Heading as ='h1' fontSize='18px'>EMS App</Heading>
      <Spacer/>
      <Flex spacing='20px'  gap='5' alignItems='center' display={['none','none','flex','flex']} >
      
        {isLoggedIn ? 
           <>
           {currentUserRole === "viewer" ? null : 
           <Link as={ReachLink} to="/add-emp">Add Employee</Link>
            }
           <Link as={ReachLink} to="/all-emp">All Employees</Link>
           <Box bg='gray.200' px='7px' py='5px'>Welcome {currentUserName}</Box>
           <Button colorScheme='purple' mr='8px' onClick={logout} >Logout</Button>
         </>
        : null
        }
      </Flex>
      <IconButton
        aria-label = 'Open Menu'
        size='lg'
        mr={2}
        icon={<HamburgerIcon />}
        display={['flex','flex','none','none']}
        onClick={()=> setDisplay('flex')}
        />
        
      <Switch
        color='green'
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </Flex>
    <Flex w='100vw'
    bgColor='gray.50'
    zIndex={20}
    h='100vh'
    pos='fixed'
    top='0'
    left='0'
    overflowy='auto'
    flexDir='column'
    display={display}
    >
        <Flex justify='flex-end'>
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon/>}
            onClick={()=> setDisplay('none')}
          />
        </Flex>
       <Flex
        flexDir ='column'
        align='center'
        gap='5'
       >
          <Link as={ReachLink} to="/">Home</Link>
          <Link as={ReachLink} to="/add-emp">Add Employee</Link>
          <Link as={ReachLink} to="/all-emp">All Employees</Link>
          <Box bg='gray.200' px='7px' py='5px'>Welcome Manoj</Box>
          <Button colorScheme='purple' mr='8px' >Logout</Button>
       </Flex> 
    </Flex>
   
    </>
  )
}

export default Header