import React from 'react'
import { Form, Button } from 'react-bootstrap'

// Import firebase configuration from firebase.ts file
// @ts-ignore

const TodoForm = ({ title, handleChange,addTodo}) => {

  return (
    <Form 
      onSubmit={(e) => e.preventDefault()}
      className='pt-4 border-top'
    >
      <Form.Control
        onChange={handleChange}
        value={title}
        className='border border-2 border-dark py-3 custom-input'
        placeholder='Enter new task'
      />
      <Button type="submit"
        className="mt-3 btn btn-dark border-dark w-100"
        disabled={title === '' ? true : false}
        onClick={() => addTodo()}
        size='lg'
      >
        Submit
      </Button>
    </Form>
  )
}

export default TodoForm