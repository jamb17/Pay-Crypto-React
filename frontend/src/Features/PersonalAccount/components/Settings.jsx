import Header from './Header.jsx'
import { ChangePasswordForm } from './ChangePasswordForm.jsx'
import { ChangeAvatar } from './ChangeAvatar.jsx'

export const Settings = () => {

    return <>
        <Header />
        <div className='grid gap-5 w-full justify-center grid-cols-[repeat(2,_456px)] justify-items-center'>
            <ChangePasswordForm />
            <ChangeAvatar />
        </div>
    </>
}