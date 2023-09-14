import React, { FC } from 'react'
import { Stepper } from 'react-form-stepper'

const StepperComp:FC<any> = ({steps,activeStep}) => {
  return (
     <Stepper steps={steps} activeStep={activeStep} />
  )
}

export default StepperComp