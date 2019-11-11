import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import {
  Nav,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Form,
  Button,
  Input,
} from '@bootstrap-styled/v4'

export default function AppHeader() {
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const location = useLocation()
  let q
  if (location.search) {
    const params = qs.parse(location.search)
    if (params.q) {
      q = params.q
    }
  }

  return (
    <Navbar color="faded" light toggleable="lg">
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarBrand>Recipes</NavbarBrand>
          <NavbarToggler onClick={() => setOpen(!open)} />
        </div>
        <Collapse navbar isOpen={open}>
          <Nav navbar className="mr-auto">
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
          </Nav>
          <Formik
            initialValues={{ q: q || '' }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false)
              if (values.q && values.q.length) {
                history.push(`/recipes/?q=${values.q}`)
              } else {
                history.push('/recipes')
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form inline className="my-2 my-lg-0">
                <Input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="q"
                  value={values.q}
                />
                <Button
                  disabled={isSubmitting}
                  color="success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Container>
    </Navbar>
  )
}
