import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react'

const About = () => {
  const a  = useContext(noteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
        This is about {a.state.name}
    </div>
  )
}

export default About
