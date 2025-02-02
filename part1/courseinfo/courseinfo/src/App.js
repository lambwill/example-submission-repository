import React from 'react'

const App = () => {
  const course =' Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
  }

  const Part = (props) => {
    console.log(props)
    return <p>{props.part} {props.exercises}</p>
  }

  const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part part={parts[0].name} exercises={parts[0].exercises} />
        <Part part={parts[1].name} exercises={parts[1].exercises} />
        <Part part={parts[2].name} exercises={parts[2].exercises} />
      </div>
    )
  }

  const Footer = (props) => {
    console.log(props)
    return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>

  )
}

export default App;
