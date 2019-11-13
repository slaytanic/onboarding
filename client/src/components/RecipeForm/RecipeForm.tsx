import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Row, Col, Form, Input, Button, H5 } from '@bootstrap-styled/v4'

import { Recipe } from 'data/recipes/types'

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .max(200, 'Too Long!')
    .required('Recipe name is required'),
  description: Yup.string()
    .max(200, 'Too Long!')
    .required('Recipe description is required'),
  ingredients: Yup.array()
    .of(
      Yup.object()
        .shape({
          name: Yup.string()
            .max(200, 'Too Long!')
            .required('Required'),
        })
        .required('Must have ingredients')
    )
    .min(1, 'Must have at least one ingredient'),
})

interface Props {
  recipe?: Recipe;
  onSubmit: Function;
}

export default function RecipeForm({
  recipe = { name: '', description: '', ingredients: [{ name: '' }] },
  onSubmit,
}: Props): ReactElement {
  const history = useHistory()
  const initialValues = {
    name: recipe.name || '',
    description: recipe.description || '',
    ingredients: recipe.ingredients || [{ name: '' }],
  }
  return (
    <div>
      {/* <BForm>
        <Input placeholder="Name"></Input>
        <Input placeholder="Description"></Input>
      </BForm> */}
      <Formik
        initialValues={initialValues}
        validationSchema={RecipeSchema}
        onSubmit={async (values, actions): Promise<void> => {
          const response = await onSubmit(values)
          actions.setSubmitting(false)
          if (response && response.id) {
            history.push(`/recipes/${response.id}`)
          }
        }}
      >
        {({
          values,
          // errors,
          // touched,
          // handleChange,
          // handleBlur,
          handleSubmit,
          isSubmitting,
        }): ReactElement => (
          <Form onSubmit={handleSubmit}>
            <Row className="mt-4">
              <Field as={Input} name="name" placeholder="Name" />
            </Row>
            <Row>
              <ErrorMessage name="name" component="div" />
            </Row>
            <Row className="mt-4">
              <Field as={Input} name="description" placeholder="Description" />
            </Row>
            <Row>
              <ErrorMessage name="description" component="div" />
            </Row>
            <Row className="mt-4">
              <H5>Ingredients</H5>
            </Row>
            <FieldArray
              name="ingredients"
              render={(arrayHelpers): ReactElement | ReactElement[] =>
                values.ingredients && values.ingredients.length > 0 ? (
                  values.ingredients.map((_, index) => (
                    <>
                      <Row key={index} className="mt-4">
                        <Col md="10">
                          <Field
                            as={Input}
                            name={`ingredients.${index}.name`}
                            placeholder={`Ingredient #${index + 1}`}
                          />
                        </Col>
                        <Col md="1">
                          <Button
                            onClick={(): void => arrayHelpers.remove(index)}
                          >
                            -
                          </Button>
                        </Col>
                        <Col md="1">
                          <Button
                            onClick={(): void =>
                              arrayHelpers.insert(index + 1, { name: '' })
                            }
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <ErrorMessage
                          name={`ingredients.${index}.name`}
                          component="div"
                        />
                      </Row>
                    </>
                  ))
                ) : (
                  <>
                    <Row className="mt-2">
                      <ErrorMessage name={`ingredients`} component="div" />
                    </Row>
                    <Row className="mt-2">
                      <Button
                        onClick={(): void => arrayHelpers.push({ name: '' })}
                      >
                        Add an ingredient
                      </Button>
                    </Row>
                  </>
                )
              }
            />
            <Row className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}
