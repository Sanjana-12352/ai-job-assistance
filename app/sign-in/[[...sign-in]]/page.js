
// app/sign-in/[[...sign-in]]/page.js
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000'
    }}>
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-[#00ff88] hover:bg-[#00dd77]',
            card: 'bg-[#1a1a1a] border border-[#333]',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton: 'border-[#333] text-white hover:bg-[#222]',
            formFieldLabel: 'text-gray-300',
            formFieldInput: 'bg-[#0a0a0a] border-[#333] text-white',
            footerActionLink: 'text-[#00ff88] hover:text-[#00dd77]'
          }
        }}
      />
    </div>
  )
}