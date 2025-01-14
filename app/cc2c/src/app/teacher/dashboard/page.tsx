import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { AppBar } from '@local/components';
import { TeacherDashboard } from './TeacherDashboard';
import { getClassesByTeacherId } from './actions';
import type { UserWithoutPass } from '@local/app/api/auth/types';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as UserWithoutPass | undefined;
    if (!user) redirect('/');
    const classes = await getClassesByTeacherId(user.id);

    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            <TeacherDashboard classes={classes} />
        </React.Fragment>
    );
}
