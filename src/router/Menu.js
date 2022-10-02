import React, { Component } from 'react'
import { Button, Card, Container, Form, Nav, Navbar, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'react-redux'
import { fetchArticle } from '../../src/redux/action/FetchArticle'
export class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }
  componentWillMount() {
    this.props.fetchArticle();
  }

  render() {
    const { newArticle } = this.props;
    return (
      <>
        <Router>
          <Navigator />
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/users' element={<Users data={newArticle} />} />
            <Route path='/account' element={<Account />} />
            <Route path='/about' element={<About />} />
            <Route path='/ViewPathVariable' element={<ViewPathVariable />} />
            <Route path='/View/:id' element={<ViewId />} />
            <Route path='/ViewDetail/:id' element={<ViewDetail data={newArticle} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    newArticle: state.articleR.dataPhoto
  });
}

const mapDispatchToProps = { fetchArticle }
export default connect(mapStateToProps, mapDispatchToProps)(Menu)

export function ViewDetail({ data }) {
  const { id } = useParams();
  const allData = data.find((d) => d.id = id);
  console.log("ViewDetail", allData)
  return (
    <>
      <div className='container d-inline-flex'>
        <Card style={{ width: '280px' }}>
          <Card.Img variant="top" src={allData.thumbnailUrl} alt={allData.thumbnailUrl} />
          <Card.Body>
            <Card.Title className='text-uppercase'>View Detail</Card.Title>
            <Card.Text>
              {allData.title}
            </Card.Text>
            <div variant="primary" className='badge bg-black'>{id}</div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}


export function ViewId() {
  const { id } = useParams();
  return (
    <>
      <div className='container'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className='text-uppercase'>View Id</Card.Title>
            <Card.Text>
              {``}
            </Card.Text>
            <div variant="primary" className='badge bg-black'>{id}</div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}


export function Navigator() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to=''>React-Router-V6.2</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to=''>Home</Nav.Link>
              <Nav.Link as={Link} to='/users'>Users</Nav.Link>
              <Nav.Link as={Link} to='/account'>Account</Nav.Link>
              <Nav.Link as={Link} to='/about'>About</Nav.Link>
            </Nav>
            <div className='d-flex px-5'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export const Home = ({ data }) => {
  console.log("Home", data);
  return (
    <>
      <h1>Home</h1>
      <p>This is page Home</p>
    </>
  )
}
export const Users = ({ data }) => {
  console.log("Users", data);
  return (
    <div className='container-fluid m-0 p-0'>
      <Table striped borderless hover variant="dark" size='sm'>
        <thead>
          <tr className='text-start'>
            <th>#</th>
            <th>Title</th>
            <th>Picture</th>
            <th>Memo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => <tr key={i} className='text-start'>
            <td>{v.id}</td>
            <td>{v.title}</td>
            <td>
              <img src={v.completed} alt={v.completed} style={{ width: '60px' }} />
            </td>
            <td>
              <Button variant='dark' size='sm' as={Link} to={`/ViewDetail/${v.id}`}>View Detail</Button>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export const Account = () => {
  return (
    <>
      <h1>Account</h1>
      <div>
        <Button variant='warning' size='sm' as={Link} to='/ViewPathVariable?name=chindapao&&gender=male&&age=23'>ViewPathVariable</Button>
      </div>
      <div className='pt-3'>
        <Button variant='warning' size='sm' as={Link} to={`/View/5`} >ViewId</Button>
      </div>
    </>
  )
}
export const About = () => {
  return (
    <>
    </>
  )
}

export function ViewPathVariable() {
  const nice = queryString.parse(useLocation().search)
  console.log("URL", nice);
  return (
    <>
      <div className='container'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className='text-uppercase'>{nice.name}</Card.Title>
            <Card.Text className='text-uppercase'>
              {nice.gender}
            </Card.Text>
            <div variant="primary" className='badge bg-black'>{nice.age}</div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}


export function NotFound() {
  return (
    <>
      <h1>404!</h1>
      <p>This page is Not Found</p>
    </>
  )
}
