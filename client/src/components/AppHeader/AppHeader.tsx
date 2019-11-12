import React, { useState, ReactElement } from 'react'
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore doesn't have definitions available
} from '@bootstrap-styled/v4'

import RecipeSearch from 'components/RecipeSearch'

export default function AppHeader(): ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <Navbar color="faded" light toggleable="lg">
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarBrand>Recipes</NavbarBrand>
          <NavbarToggler onClick={(): void => setOpen(!open)} />
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
