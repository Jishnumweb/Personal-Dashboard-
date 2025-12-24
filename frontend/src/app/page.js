"use client"

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

function Frontpage() {
  useEffect(()=>{
    redirect("/admin/leads")

  },[])
  return (
    <div>
      
    </div>
  )
}

export default Frontpage
// 8P1vFPu0mxkwQHVg
// jishnumme_db_user