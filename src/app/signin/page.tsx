// // pages/auth/signin.tsx
// "use client"
// import { signIn } from 'next-auth/react'
// import React,{ useState } from 'react'

// export default function SignIn() {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const result = await signIn('credentials', {
//       redirect: false,
//       username,
//       password,
//     })

//     if (result?.error) {
//       setError(result.error)
//     } else {
//       // Redirect or do something on successful sign-in
//     }
//   }

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Sign In</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   )
// }
import SignInPage from '@/components/responsive-login-page'
import React from 'react'

const SignIn = () => {
  return (
    <div>
      <SignInPage/>
    </div>
  )
}

export default SignIn
