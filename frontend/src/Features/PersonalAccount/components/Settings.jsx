import Header from './Header.jsx'
import { ChangePasswordForm } from './ChangePasswordForm.jsx'
import { ChangeAvatar } from './ChangeAvatar.jsx'
import { ChangeNickname } from './ChangeNickname.jsx'

export const Settings = () => {

    return <>
        <Header />
        <div className='grid gap-5 w-full justify-center grid-cols-[repeat(2,_456px)] justify-items-center'>
            <div className='flex flex-col gap-5 w-full'>
                <ChangePasswordForm />
                <ChangeNickname/>
            </div>
            <div className='flex flex-col gap-5 w-full'>
                <ChangeAvatar />
            </div>
        </div>
    </>
}