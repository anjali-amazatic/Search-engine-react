import React from 'react'
import error from './assets/error.png';
import style from './PageNotFound.module.css';

const PageNotFound = () =>{
  return (
    <>
    <img src={error} alt="404-error" className={style.background_img}/>
    </>

  )
}

export default PageNotFound;