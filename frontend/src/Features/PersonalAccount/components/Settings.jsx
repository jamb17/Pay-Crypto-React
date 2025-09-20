import Header from './Header.jsx'
import { ChangePasswordForm } from './ChangePasswordForm.jsx'
import { ChangeAvatar } from './ChangeAvatar.jsx'
import { ChangeNickname } from './ChangeNickname.jsx'

export const Settings = () => {

    return <>
        <Header />
        <div className='flex flex-col items-center pt-[96px] pb-[76px] gap-5 w-full md:flex-row md:items-start md:justify-center'>
            <div className='flex flex-col gap-5 w-full max-w-[456px]'>
                <ChangePasswordForm />
                <ChangeNickname/>
            </div>
            <div className='flex flex-col gap-5 w-full max-w-[456px]'>
                <ChangeAvatar />
            </div>
        </div>
    </>
}