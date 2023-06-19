import SortingTable from '../components/SortingTable'
import { Container, Heading, Spacer } from '@chakra-ui/react'
const AllEmp = () => {
  
  
  return (
    <>
      <Container maxW={1700} py={10}>
        <Heading as='h2'>
          Employee List
        </Heading>
        <Spacer py={5}/>
       <SortingTable />
      </Container>
      
    </>
  )
}

export default AllEmp