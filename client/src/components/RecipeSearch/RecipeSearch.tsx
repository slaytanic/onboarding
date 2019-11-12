import React, { ReactElement } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { Formik } from 'formik'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore doesn't have definitions available
import { Form, Button, Input } from '@bootstrap-styled/v4'

export default function RecipeSearch(): ReactElement {
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
    <Formik
      initialValues={{ q: q || '' }}
      onSubmit={async (values, actions): Promise<void> => {
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
      }): ReactElement => (
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
  )
}
