import React, { useState } from 'react'
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
} from '@bootstrap-styled/v4'

import RecipeSearch from 'components/RecipeSearch'

export default function AppHeader() {
  const [open, setOpen] = useState(false)

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
          <RecipeSearch />
        </Collapse>
      </Container>
    </Navbar>
  )
}
