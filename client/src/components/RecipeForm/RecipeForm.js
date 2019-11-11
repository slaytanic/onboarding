import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

export default function RecipeForm({ recipe = {}, onSubmit }) {
  const history = useHistory()
  const initialValues = {
    name: recipe.name || '',
    description: recipe.description || '',
    ingredients: recipe.ingredients || [{ name: '' }],
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RecipeSchema}
        onSubmit={async (values, actions) => {
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
          // handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
            <Field name="description" placeholder="Description" />
            <ErrorMessage name="description" component="div" />
            <h5>Ingredients</h5>
            <FieldArray
              name="ingredients"
              render={arrayHelpers => (
                <div>
                  {values.ingredients && values.ingredients.length > 0 ? (
                    values.ingredients.map((ingredients, index) => (
                      <div key={index}>
                        <Field
                          name={`ingredients.${index}.name`}
                          placeholder={`Ingredient #${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.insert(index + 1, { name: '' })
                          }
                        >
                          +
                        </button>
                        <ErrorMessage
                          name={`ingredients.${index}.name`}
                          component="div"
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <ErrorMessage name={`ingredients`} component="div" />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push({ name: '' })}
                      >
                        Add an ingredient
                      </button>
                    </div>
                  )}
                </div>
              )}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
