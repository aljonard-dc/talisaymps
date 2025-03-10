import React from 'react'
import LogInForm from './ui/LogInForm'

const LogIn = () => {
  return (
    <main className="relative h-screen bg-blue-50 flex items-center justify-center p-10 mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/logo.png')] opacity-5 bg-center 
      bg-repeat-space bg-[size:150px] lg:bg-[size:220px] 2xl:bg-[size:220px]"></div>

      {/* Login Form - Positioned Above Everything */}
      <div className="relative z-10">
        <LogInForm />
      </div>
    </main>
  )
}

export default LogIn
