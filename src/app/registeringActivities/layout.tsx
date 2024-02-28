import  UserLayout  from '@/app/user/layout';

export default function ActivityLayout({
    children,
}: {
    children?: React.ReactNode
}) {

    return (
        <UserLayout>
            {children}
        </UserLayout>
    )
}